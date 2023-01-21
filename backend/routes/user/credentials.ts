import PromiseRouter from 'express-promise-router';
import db from '../../node_modules';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { v4 as uuid } from 'uuid';

const credentials = PromiseRouter();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ADDR,
    pass: process.env.MAIL_PASS,
  },
});

credentials.get('/exists/:username', async (req, res) => {
  const { username } = req.params;  
  const response = await db.query('select * from local_credentials where username = $1', [username]);

  return res.status(200).json(response.rows[0]?.username || null) 
});

credentials.get('/email/exists/:email', async (req, res) => {
  const { email } = req.params; 
  const response = await db.query('select * from users where email = $1', [email]);

  return res.status(200).json(response.rows[0]?.email || null);
});

// For password resets, this route handles the email entry portion, creates a reset_id & reset_deadline, and sends a reset email
credentials.get('/verify/:email', async (req, res) => {
  const { email } = req.params;
  const response = await db.query('select * from users where email = $1', [email]);

  if (!response.rowCount) return res.status(404).send();
  
  const user_id = response.rows[0].id;
  const reset_id = uuid();
  const expiryDelta = 1000 * 60 * 60 * 6 // 6 hours
  const expiryDate = new Date().getTime() + expiryDelta;

  const idResponse = await db.query(
    `update local_credentials
    set 
      reset_id = $1,
      reset_deadline = $2
    where user_id = $3
    returning *`,
    [reset_id, expiryDate, user_id]
  );

  if (!idResponse.rowCount) return res.status(500).send();
  
  transporter.sendMail({
    from: 'reset.amped@gmail.com',
    to: email,
    subject: 'AMPED | Password Reset Link',
    html: `<p>Follow the link below to reset your password.</p><br><br><a href="http://localhost:3000/login/reset/${reset_id}">http://localhost:3000/login/reset/${reset_id}</a><br><p>If you did not request a password reset, please disregard this email.</p>`, 
  }, (err, info) => { 
    if (err) {
      console.log(err);
      console.log(info);
      return res.status(500).json(err);
    }
    else return res.status(204).send();
  })
});
// For password resets, this route verifies the equality & deadline of the link that the user clicks on to reset password
credentials.get('/reset/:reset_id', async (req, res) => {
  const { reset_id } = req.params;
  
  const response = await db.query('select * from local_credentials where reset_id = $1', [reset_id]);
  if (!response.rowCount) return res.status(404).send('Not found');

  const { reset_deadline, reset_id: received_id } = response.rows[0];
  if (reset_id !== received_id || reset_deadline < Date.now()) return res.status(401).send('Invalid or expired');

  return res.status(200).json(response.rows[0].user_id);
});
// For password resets, this route updates the user's password
credentials.put('/password', async (req, res) => {
  const { user_id, password } = req.body; // send reset id to verify link still exists

  const hash = await bcrypt.hash(password, 12);
  const response = await db.query(`
    update local_credentials
    set hash = $1, 
    reset_id = null,
    reset_deadline = null
    where user_id = $2
    returning *`, 
    [hash, user_id]
  );

  if (!response.rowCount) return res.status(500).send();
  return res.status(204).send();
});


credentials.post('/new', async (req, res) => {
  const { password, user_id, username } = req.body;

  const hash = await bcrypt.hash(password, 12);

  const response = await db.query(`
    insert into local_credentials values (
      $1, $2, $3
    ) returning user_id`, 
    [hash, user_id, username]
  );

  if (!response.rowCount) return res.status(500).json('Could not create credentials');
  return res.status(200).json(response.rows[0]);
});



export default credentials;
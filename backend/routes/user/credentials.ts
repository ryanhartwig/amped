import PromiseRouter from 'express-promise-router';
import db from '../../db';
import * as bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

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

credentials.get('/reset/:email', async (req, res) => {
  const { email } = req.params;
  const response = await db.query('select * from users where email = $1', [email]);

  if (!response.rowCount) return res.status(200).send();

  transporter.sendMail({
    from: process.env.MAIL_ADDR,
    to: email,
    subject: 'AMPED | Password Reset Link',
    text: 'Test',
  }, (err) => {
    if (err) return res.status(500).json(err);
    else return res.status(200).send();
  })
})

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
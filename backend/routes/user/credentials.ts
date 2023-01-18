import PromiseRouter from 'express-promise-router';
import db from '../../db';
import * as bcrypt from 'bcrypt';

const credentials = PromiseRouter();

credentials.get('/unique/:username', async (req, res) => {
  const { username } = req.params;
  const response = await db.query('select * from local_credentials where username = $1', [username]);

  return res.status(200).json(!!response.rowCount)
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
})

export default credentials;
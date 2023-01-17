import PromiseRouter from 'express-promise-router';
import db from '../../db';

const credentials = PromiseRouter();

credentials.get('/unique/:username', async (req, res) => {
  const { username } = req.params;
  const response = await db.query('select * from hashes where username = $1', [username]);

  return res.status(200).json(!!response.rowCount)
})

export default credentials;
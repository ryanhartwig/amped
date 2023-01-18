import PromiseRouter from "express-promise-router";
import db from "../../db";
import { User } from "../../types/user";

const user = PromiseRouter();

user.post('/new', async (req, res) => {
  const { id, name, email, weekly_target } = req.body as User;
  const params = [id, name, email, weekly_target];

  if (params.some(p => p === undefined)) return res.status(400).json('Missing parameters in request body');
  const response = await db.query('insert into users values ($1, $2, $3, $4) returning *', params);

  if (!response.rowCount) return res.status(500).json('Could not create user');
  res.status(201).json(response.rows[0]);
});

user.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await db.query('select * from users where id = $1', [id]);
  if (!response.rowCount) return res.status(404).json('No user found');
  else return res.json(response.rows[0]);
});

user.put('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const patch = req.body;

  const existing = await db.query('select * from users where id = $1', [user_id]);
  if (!existing.rowCount) return res.status(404).json('A user with the provided id was not found.');

  const { id, name, email, weekly_target }: User = {
    ...existing.rows[0],
    ...patch,
  }

  const response = await db.query(`
    update users set 
      name = $2,
      email = $3,
      weekly_target = $4
    where id = $1
    returning *
  `, [id, name, email, weekly_target]);

  return res.status(200).json(response.rows[0]);
});

user.delete('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  const response = await db.query('delete from users where id = $1 returning *', [user_id]);

  if (!response.rowCount) return res.status(500).json('Could not delete user or does not exist');
  return res.status(200).json('Successfully deleted user with id: ' + user_id);
})


export default user;
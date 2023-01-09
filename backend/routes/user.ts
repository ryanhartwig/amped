import PromiseRouter from "express-promise-router";
import db from "../db";

const user = PromiseRouter();

interface User {
  id: string,
  name: string,
  email: string,
  weekly_target: number,
}

user.post('/add', async (req, res) => {
  const { id, name, email, weekly_target } = req.body as User;
  const params = [id, name, email, weekly_target];

  if (params.some(p => p === undefined)) return res.status(400).send('Missing parameters in request body');
  const response = await db.query('insert into users values ($1, $2, $3, $4) returning *', params);

  if (response.rows) return res.status(201).send(response.rows);
  else return res.status(500).json(response);
});

user.get('/:id', async (req, res) => {
  const { id } = req.params;

  const response = await db.query('select * from users where id = $1', [id]);
  if (!response.rowCount) return res.status(404).send('No user found');
  else return res.json(response.rows);
});

user.put('/:param_id', async (req, res) => {
  const { param_id } = req.params;
  const patch = req.body;

  const existing = await db.query('select * from users where id = $1', [param_id]);
  if (!existing.rowCount) return res.status(404).send('A user with the provided id was not found.');

  const { id, name, email, weekly_target }: User = {
    ...existing.rows[0],
    ...patch,
  }

  const response = await db.query(`
  update users 
  set name = $2,
      email = $3,
      weekly_target = $4
  where id = $1
  returning *
  `, [id, name, email, weekly_target]);

  return res.status(200).send(response.rows);
})

export default user;
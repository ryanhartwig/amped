import PromiseRouter from "express-promise-router";
import { QueryResult } from "pg";
import db from "../../db";
import { Goal } from "../../types/goal";

const goals = PromiseRouter();

/* Get all goals for provided user_id */
goals.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).send('Missing user_id url parameter');

  const response = await db.query('select * from goal where user_id = $1', [user_id]);

  if (!response.rowCount) return res.status(404).send('No goals found for provided user id');
  res.status(200).json(response.rows);
});


goals.post('/new', async (req, res) => {
  const { id, user_id, deadline, completed, goal } = req.body as Goal;
  const params = [id, user_id, deadline, completed, goal];

  if (params.some(p => p === undefined)) return res.status(400).send("Missing parameter(s) in JSON object");

  const response = await db.query(`
    insert into goal
    values (
      $1, $2, $3, $4, $5
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).send('Could not create goal');
  res.status(201).json(response.rows[0]);
});

goals.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('Missing id url parameter');

  const existing = await db.query('select * from goal where id = $1', [id]) as QueryResult<Goal>;
  const patch = req.body as Partial<Goal>;

  const { user_id, deadline, completed, goal }: Goal = {
    ...existing.rows[0],
    ...patch
  }

  const response = await db.query(`
    update goal set
      user_id = $2,
      deadline = $3,
      completed = $4,
      goal = $5
    where id = $1
    returning *
  `, [id, user_id, deadline, completed, goal]);

  if (!response.rowCount) return res.status(500).send('Could not update goal');
  res.status(200).json(response.rows[0]);
});

goals.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Missing id url parameter');

  const response = await db.query('delete from goal where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).send('A goal with the provided id does not exist');
  res.status(200).send(`Successfully deleted goal with id: ${response.rows[0].id}`);
});

export default goals;
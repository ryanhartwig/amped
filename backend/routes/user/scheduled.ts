import PromiseRouter from "express-promise-router";
import { QueryResult } from "pg";
import db from "../../db";
import { Scheduled } from "../../types/scheduled";

const scheduled = PromiseRouter();

/* Get all goals for provided user_id */
scheduled.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).send('Missing user_id url parameter');

  const response = await db.query('select * from scheduled where user_id = $1', [user_id]);

  if (!response.rowCount) return res.status(404).send('No scheduled routine data found for provided user id');
  res.status(200).json(response.rows);
});


scheduled.post('/new', async (req, res) => {
  const { id, user_id, routine_id, day } = req.body as Scheduled;
  const params = [id, user_id, routine_id, day];

  if (params.some(p => p === undefined)) return res.status(400).send("Missing parameter(s) in JSON object");

  const response = await db.query(`
    insert into scheduled
    values (
      $1, $2, $3, $4
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).send('Could not create scheduled routine');
  res.status(201).json(response.rows[0]);
});

scheduled.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('Missing id url parameter');

  const existing = await db.query('select * from scheduled where id = $1', [id]) as QueryResult<Scheduled>;
  const patch = req.body as Partial<Scheduled>;

  const { user_id, routine_id, day }: Scheduled = {
    ...existing.rows[0],
    ...patch
  }

  const response = await db.query(`
    update scheduled set
      user_id = $2,
      routine_id = $3,
      day = $4,
    where id = $1
    returning *
  `, [id, user_id, routine_id, day]);

  if (!response.rowCount) return res.status(500).send('Could not update goal');
  res.status(200).json(response.rows[0]);
});

scheduled.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Missing id url parameter');

  const response = await db.query('delete from scheduled where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).send('A schedule with the provided id does not exist');
  res.status(200).send(`Successfully deleted schedule with id: ${response.rows[0].id}`);
});

export default scheduled;
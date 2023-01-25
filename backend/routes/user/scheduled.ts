import PromiseRouter from "express-promise-router";
import { QueryResult } from "pg";
import db from "../../db";
import { Scheduled } from "../../types/scheduled";

const scheduled = PromiseRouter();

/* Get all goals for provided user_id */
scheduled.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).json('Missing user_id url parameter');

  const response = await db.query('select * from scheduled where user_id = $1', [user_id]);

  if (!response.rowCount) return res.status(404).json('No scheduled routine data found for provided user id');
  res.status(200).json(response.rows);
});

scheduled.post('/new', async (req, res) => {
  const { id, user_id, routine_id, day } = req.body as Scheduled;
  const params = [id, user_id, routine_id, day];

  if (params.some(p => p === undefined)) return res.status(400).json("Missing parameter(s) in JSON object");

  const response = await db.query(`
    insert into scheduled
    values (
      $1, $2, $3, $4
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).json('Could not create scheduled routine');
  res.status(201).json(response.rows[0]);
});

scheduled.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json('Missing id url parameter');

  const response = await db.query('delete from scheduled where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).json('A schedule with the provided id does not exist');
  res.status(200).json(`Successfully deleted schedule with id: ${response.rows[0].id}`);
});

export default scheduled;
import PromiseRouter from "express-promise-router";
import { QueryResult } from "pg";
import db from "../db";
import { Exercise } from "../types/exercise";

const exercises = PromiseRouter();

/* Get all exercises for user */
exercises.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).send('Missing "user_id" url parameter');

  const response = await db.query('select * from exercise where user_id = $1', [user_id]);

  return res.status(200).json(response.rows);
});

/* Create a new exercise */
exercises.post('/new', async (req, res) => {
  const { id, user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes } = req.body as Exercise;
  const params = [id, user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes];

  if (params.some(p => p === undefined)) return res.status(400).send('Missing parameter(s) in JSON object');

  const response = await db.query(`
    insert into exercise
    values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).send('Could not add exercise');
  res.status(201).json(response.rows[0]);
});

/* Edit an existing exercise */
exercises.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send('Missing "id" url parameter');

  const patch = req.body;
  const existing = await db.query('select * from exercise where id = $1', [id]) as QueryResult<Exercise>;
  
  if (!existing.rowCount) return res.status(404).send('Could not find exercise with given id');

  const { user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes }: Exercise = {
    ...existing.rows[0],
    ...patch,
  };  
  const params = [user_id, name, exercise_goal, muscle_targets, type, favourited, intensity, notes];

  const response = await db.query(`
    update exercise set
      user_id = $2,
      name = $3,
      exercise_goal = $4,
      muscle_targets = $5,
      type = $6,
      favourited = $7,
      intensity = $8,
      notes = $9
    where id = $1
    returning *
  `, [id, ...params]); 

  if (!response.rowCount) return res.status(500).send('Could not update exercise');

  res.status(200).json(response.rows[0]);
});
 
exercises.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Missing "id" url parameter');

  const response = await db.query('delete from exercise where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).send('Could not find exercise with given id');

  res.status(200).send(`Successfully deleted exercise: "${response.rows[0].name}"`);
})



export default exercises; 
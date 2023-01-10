import PromiseRouter from "express-promise-router";
import db from "../db";

interface RoutineExercise {
  id: string,
  routine_id: string,
  exercise_id: string,
  position: number,
}

const routine_exercise = PromiseRouter();

/* Get all exercises belonging provided routine_id */
routine_exercise.get('/:routine_id', async (req, res) => {
  const { routine_id } = req.params;

  if (!routine_id) return res.status(400).send('Missing routine_id url parameter');

  const response = await db.query('select * from routines_exercises where routine_id = $1', [routine_id]);

  if (!response.rowCount) return res.status(404).send('No exercises found for specified routine id');
  res.status(200).json(response.rows);
});

routine_exercise.post('/new', async (req, res) => {
  const { id, routine_id, exercise_id, position } = req.body as RoutineExercise;
  const params = [id, routine_id, exercise_id, position];

  if (params.some(p => p === undefined)) return res.status(400).send('Missing parameters in JSON object');

  const response = await db.query(`
    insert into routines_exercises
    values (
      $1, $2, $3, $4
    ) returning *
  `, params);
  
  if (!response.rowCount) return res.status(500).send('Could not add routine_exercise data');
  res.status(201).json(response.rows[0]);
});

routine_exercise.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('Missing id url parameter');

  const response = await db.query('delete from routines_exercises where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).send('A routine_exercise relationship does not exist with provided id');
  res.status(200).send(`Successfully deleted routine_exercise with id: ${response.rows[0].id}`);
});

export default routine_exercise;
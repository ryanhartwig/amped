import PromiseRouter from "express-promise-router";
import db from "../../db";
import { PerformedExercise } from "../../types/performed_exercise";

const exercise = PromiseRouter();

/* Get all exercise data for a performed routine */
exercise.get('/:performed_routine_id', async (req, res) => {
  const { performed_routine_id } = req.params;

  if (!performed_routine_id) return res.status(400).json('No performed exercise id provided');
  const response = await db.query('select * from performed_exercise where performed_routine_id = $1 order by exercise_position', [performed_routine_id]);

  res.status(200).json(response.rows);
});

/* Add exercise data */
exercise.post('/new', async (req, res) => {
  const { 
    id, exercise_id, performed_routine_id, exercise_position, exercise_name, duration
  } = req.body as PerformedExercise;
  const params = [id, exercise_id, performed_routine_id, exercise_position, exercise_name, duration];

  if (params.some(v => v === undefined)) 
    return res.status(400).json('Missing properties in JSON object')

  const response = await db.query(`
    insert into performed_exercise values (
      $1, $2, $3, $4, $5, $6
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).json('Could not create exercise data');
  res.status(201).json(response.rows[0]);
});

/* Edit existing exercise data */
exercise.put('/:id', async (req, res) => {
  const { id } = req.params;
  const patch: PerformedExercise = req.body;

  const select = await db.query('select * from performed_exercise where id = $1', [id]);
  const existing: PerformedExercise = select.rows[0];

  if (!existing) return res.status(404).json('Could not find exercise data with given id');

  const {
    exercise_id, performed_routine_id, exercise_position, exercise_name, duration
  }: PerformedExercise = {
    ...existing, 
    ...patch,
  }
  const params = [exercise_id, performed_routine_id, exercise_position, exercise_name, duration] 

  const response = await db.query(`
    update performed_exercise set 
      exercise_id = $2,
      performed_routine_id = $3,
      exercise_position = $4,
      exercise_name = $5,
      duration = $6
    where id = $1
    returning *
  `, [id, ...params]);

  if (!response.rowCount) return res.status(500).json('Could not update exercise data');

  res.status(200).json(response.rows[0]);
});

/* Delete existing data */
exercise.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json('No id provided');

  const response = await db.query('delete from performed_exercise where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).json('No exercise data with provided id exists');

  return res.status(200).json(`Successfully deleted exercise data with id: '${response.rows[0].id}'`);
})

export default exercise;
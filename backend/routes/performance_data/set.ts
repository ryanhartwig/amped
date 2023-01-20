import PromiseRouter from "express-promise-router";
import db from "../../db";
import { PerformedSet } from "../../types/performed_set";

const set = PromiseRouter();

/* Get all exercise data for a performed routine */
set.get('/:performed_exercise_id', async (req, res) => {
  const { performed_exercise_id } = req.params;

  if (!performed_exercise_id) return res.status(400).json('No performed exercise id provided');
  const response = await db.query('select * from performed_set where performed_exercise_id = $1 order by position', [performed_exercise_id]);

  res.status(200).json(response.rows);
});

/* Add exercise data */
set.post('/new', async (req, res) => {
  const { 
    id, performed_exercise_id, duration, modifiers, position, weight, count
  } = req.body as PerformedSet;
  const params = [id, performed_exercise_id, duration, modifiers, position, weight, count];

  if (params.some(p => p === undefined)) return res.status(400).json('Missing properties in json object');

  const response = await db.query(`
    insert into performed_set values (
      $1, $2, $3, $4, $5, $6, $7
    ) returning *
  `, params);

  if (!response.rowCount) {return res.status(500).json('Could not create set data')}
  res.status(201).json(response.rows[0]);
});

/* Edit existing exercise data */
set.put('/:id', async (req, res) => {
  const { id } = req.params;
  const patch: PerformedSet = req.body;

  const select = await db.query('select * from performed_set where id = $1', [id]);
  const existing: PerformedSet = select.rows[0];

  if (!existing) return res.status(404).json('Could not find exercise data with given id');

  const {
    performed_exercise_id, duration, modifiers, position, weight, count
  }: PerformedSet = {
    ...existing, 
    ...patch,
  }
  const params = [performed_exercise_id, duration, modifiers, position, weight, count] 

  const response = await db.query(`
    update performed_set set 
      performed_exercise_id = $2,
      duration = $3,
      modifiers = $4,
      position = $5,
      weight = $6,
      count = $7
    where id = $1
    returning *
  `, [id, ...params]);

  if (!response.rowCount) return res.status(500).json('Could not update set data');

  res.status(200).json(response.rows[0]);
});

/* Delete existing data */
set.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json('No id provided');

  const response = await db.query('delete from performed_set where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).json('No set data with provided id exists');

  return res.status(200).json(`Successfully deleted set data with id: '${response.rows[0].id}'`);
})

export default set;
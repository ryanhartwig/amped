import PromiseRouter from "express-promise-router";
import db from "../../db";
import { PerformedRoutine } from "../../types/performed_routine";

const routine = PromiseRouter();

/* Get all data for user */
routine.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).send('No user id provided');
  const response = await db.query('select * from performed_routine where user_id = $1', [user_id]);

  res.status(200).json(response.rows);
});

/* Add routine data */
routine.post('/new', async (req, res) => {
  const { 
    id, user_id, routine_id, duration, start_date, notes, energy
  } = req.body as PerformedRoutine;
  const params = [id, user_id, routine_id, duration, start_date, notes, energy];

  if (params.some(v => v === undefined)) 
    return res.status(400).send('Missing properties in JSON object')

  const response = await db.query(`
    insert into performed_routine values (
      $1, $2, $3, $4, $5, $6, $7
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).send('Could not create routine data');
  res.status(201).send(response.rows[0]);
});

/* Edit existing routine data */
routine.put('/:id', async (req, res) => {
  const { id } = req.params;
  const patch: PerformedRoutine = req.body;

  const select = await db.query('select * from performed_routine where id = $1', [id]);
  const existing: PerformedRoutine = select.rows[0];

  if (!existing) return res.status(404).send('Could not find routine data with given id');

  const {
    user_id, routine_id, duration, start_date, notes, energy
  }: PerformedRoutine = {
    ...existing, 
    ...patch,
  }
  const params = [user_id, routine_id, duration, start_date, notes, energy] 

  const response = await db.query(`
    update performed_routine set 
      user_id = $2,
      routine_id = $3,
      duration = $4,
      start_date = $5,
      notes = $6,
      energy = $7
    where id = $1
    returning *
  `, [id, ...params]);

  if (!response.rowCount) return res.status(500).send('Could not update routine data');

  res.status(200).json(response.rows[0]);
});

/* Delete existing data */
routine.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send('No id provided');

  const response = await db.query('delete from performed_routine where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).send('No routine data with provided id exists');

  return res.status(200).send(`Successfully deleted routine data with id: '${response.rows[0].id}'`);
})

export default routine;
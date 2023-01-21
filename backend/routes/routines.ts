import PromiseRouter from "express-promise-router";
import db from "../node_modules";
import { Routine } from "../types/routine";

const routines = PromiseRouter();

/* Get all routines for user */
routines.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;

  if (!user_id) return res.status(400).json('No user id provided');
  const response = await db.query('select * from routine where user_id = $1', [user_id]);

  res.status(200).json(response.rows);
});

/* Create a new routine */
routines.post('/new', async (req, res) => {
  const { 
    id, user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes
  } = req.body as Routine;
  const params = [id, user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes];

  if (params.some(v => v === undefined)) 
    return res.status(400).json('Missing properties in JSON object')
 
  const response = await db.query(`
    insert into routine values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    ) returning *
  `, params);

  if (!response.rowCount) return res.status(500).json('Could not create routine');
  res.status(201).json(response.rows[0]);
});

/* Edit an existing routine */
routines.put('/:id', async (req, res) => {
  const { id } = req.params;
  const patch: Routine = req.body;

  const select = await db.query('select * from routine where id = $1', [id]);
  const existing: Routine = select.rows[0];

  if (!existing) return res.status(404).json('Could not find routine with given id');

  const {
    user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes
  }: Routine = {
    ...existing, 
    ...patch,
  }
  const params = [user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes] 

  const response = await db.query(`
    update routine set 
      user_id = $2,
      name = $3,
      est_duration = $4,
      intensity = $5,
      type = $6,
      favourited = $7,
      tags = $8,
      notes = $9,
      prev_notes = $10
    where id = $1
    returning *
  `, [id, ...params]);

  if (!response.rowCount) return res.status(500).json('Could not update routine');

  res.status(200).json(response.rows[0]);
});

/* Delete an existing routine */
routines.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json('No id provided');

  const response = await db.query('delete from routine where id = $1 returning *', [id]);

  if (!response.rowCount) return res.status(404).json('No routine with provided id exists');

  res.status(200).json('Successfully deleted routine with id: ' + response.rows[0].id);
})  

export default routines;     
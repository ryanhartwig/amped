import PromiseRouter from "express-promise-router";
import db from "../db";
import { Routine } from "../types/routine";

const routines = PromiseRouter();

routines.get('/', async (req, res) => {
  const { user_id } = req.body as Partial<Routine>;

  if (!user_id) return res.status(400).send('No user id provided');
  const response = await db.query('select * from routine where user_id = $1', [user_id]);

  res.status(200).json(response.rows);
});

routines.post('/new', async (req, res) => {
  const { 
    id, user_id, name, est_duration, intensity, type, favourited, tags, notes, prev_notes
  } = req.body as Routine;
  const required = [id, user_id, name, est_duration, intensity, type, favourited]
  const opt = [tags, notes, prev_notes].map(v => v === undefined ? null : v);

  if (required.some(v => v === undefined)) 
    return res.status(400).send('Missing properties in JSON object.')

  const response = await db.query(`
    insert into routine values (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
    ) returning *
  `, [...required, ...opt]);

  if (!response.rowCount) return res.status(500).send('Could not create routine');
  res.status(201).send(response.rows[0]);
})

export default routines;  
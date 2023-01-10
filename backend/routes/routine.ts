import PromiseRouter from "express-promise-router";
import db from "../db";

const routines = PromiseRouter();

routines.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  const response = await db.query('select * from routines where user_id = $1', [user_id]);

  res.status(200).json(response.rows);
})

export default routines;
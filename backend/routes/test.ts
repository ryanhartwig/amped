import PromiseRouter from "express-promise-router";
import db from "../db";

const test = PromiseRouter();

test.get('/read', async (_, res) => {
  const response = await db.query(`SELECT * from users`);
  
  res.send(response.rows);
});

export default test;
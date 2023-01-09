import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import Router from 'express-promise-router';
import { v4 as uuidv4 } from 'uuid';
import { pool } from './db';

const app = express();
const port = process.env.PORT || 8000;
const test = Router();

app.use(morgan('dev'));
app.use('/test', test);

app.get('/', (_, res) => {
  res.send('<h1>Express += sd typescript server</h1>');
});

test.get('/ct', async (_, res) => {
  const response = await pool.query(`insert into users values ($1, 'ryan', 'ryan', 3) returning *`, [uuidv4()])
  res.send(response);
});

app.listen(port, () => {
  console.log('⚡️', `Server is running at http://localhost:${port}`);
});

import { Pool } from 'pg';

export default new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.PG_DB,
  password: '',
  port: Number(process.env.PG_PORT),
});
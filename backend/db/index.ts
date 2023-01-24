import { Pool } from 'pg';
import { getEnv } from '../baseUrl';

export default new Pool({
  ssl: getEnv({rejectUnauthorized: false}, false),
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS || '',
  port: Number(process.env.PG_PORT),
});      
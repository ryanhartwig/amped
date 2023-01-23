import { Pool } from 'pg';

export default new Pool({
  ssl: {
    rejectUnauthorized: false,
  },
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.PG_DB,
  password: process.env.PG_PASS || '',
  port: Number(process.env.PG_PORT),
});      
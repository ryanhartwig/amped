import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import mount from './routes';

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(cors());

// Mounts routes defined in ./routes/index.ts
mount(app);

app.listen(port, () => {
  console.log('⚡️', `Server is running at http://localhost:${port}`);
});

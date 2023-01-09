import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use('/', morgan('dev'));

app.get('/', (_, res) => {
  res.send('<h1>Express += sd typescript server</h1>');
});

app.listen(port, () => {
  console.log('⚡️', `Server is running at http://localhost:${port}`);
});

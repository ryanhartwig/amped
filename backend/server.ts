import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mount from './routes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';

const app = express();
const port = process.env.PORT || 8000;


app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'sample secret text',
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,
  },
  resave: false,
}));

app.use(passport.authenticate('session'));

app.use(passport.initialize());
app.use(passport.session());

// Mounts routes defined in ./routes/index.ts
mount(app);


app.listen(port, () => {
  console.log('⚡️', `Server is running at http://localhost:${port}`);
});

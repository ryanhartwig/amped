import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mount from './routes';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import facebook from './passport/facebook';
import google from './passport/google';

const app = express();
const port = process.env.PORT || 8000;


app.use(cors());

app.use(morgan('dev'));



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'sample secret', 
  saveUninitialized: false,
  cookie: {
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false,
}));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
})

app.use(passport.initialize());
app.use(passport.session());

// Mount strategies
facebook(passport);
google(passport);

// Mounts routes defined in ./routes/index.ts
mount(app);

app.listen(port, () => {
  console.log('⚡️', `Server is running at http://localhost:${port}`);
});

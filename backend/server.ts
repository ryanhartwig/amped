import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mount from './routes';
import session from 'express-session';
import passport from 'passport';
import facebook from './passport/facebook';
import google from './passport/google';
import twitter from './passport/twitter';
import local from './passport/local';

import createMemoryStore from 'memorystore';
const MemoryStore = createMemoryStore(session);

const app = express();
const port = process.env.PORT || 8000;

app.use(morgan('dev'));

app.use(cors({
  credentials: true,
  origin: 'https://ampedpro.netlify.app',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'sample secret', 
  saveUninitialized: false,
  cookie: {
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
  },
  resave: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }) as any,
}));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://ampedpro.netlify.app');
  res.header('Access-Control-Allow-Credentials', 'true');

  next();
})
 

app.use(passport.initialize());
app.use(passport.session());

// Mount strategies to passport
local(passport);
facebook(passport);
google(passport);
twitter(passport); 

// Mounts routes defined in ./routes/index.ts to app
mount(app);

app.get('/api/test', (_, res, next) => {
  res.status(200).send('Received request and updates');
  next();
})

app.listen(port, () => {
  console.log('⚡️', `Server is running. (port: ${port}, base url: amped.herokuapp.com)`);
});

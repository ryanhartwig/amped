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
  origin: 'http://localhost:3000',
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'sample secret', 
  saveUninitialized: false,
  cookie: {
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
  resave: false,
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }) as any,
}));

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
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

// app.use((req, res, next) => {
//   console.log(`
//   cookies:
  
//   `)
//   console.log(req.cookies);

//   console.log(req.headers);

//   console.log(req.session)
//   console.log(req.body)

//   next(); 
// })

// Mounts routes defined in ./routes/index.ts to app
mount(app);

app.listen(port, () => {
  console.log('⚡️', `Server is running at http://localhost:${port}`);
});

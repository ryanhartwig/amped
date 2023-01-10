import { Express } from 'express';
import exercises from './exercises';
import routines from './routines';
import users from './users';

export default (app: Express) => {
  app.use('/users', users);
  app.use('/routines', routines);
  app.use('/exercises', exercises);
}
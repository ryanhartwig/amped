import { Express } from 'express';
import routines from './routine';
import users from './user';

export default (app: Express) => {
  app.use('/users', users);
  app.use('/routines', routines);
}
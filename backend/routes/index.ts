import { Express } from 'express';
import users from './user';

export default (app: Express) => {
  app.use('/users', users);
  // additional routes here
}
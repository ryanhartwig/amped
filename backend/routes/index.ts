import { Express } from 'express';
import exercises from './exercises';
import exercise from './performance_data/exercise';
import routine from './performance_data/routine';
import set from './performance_data/set';
import routines from './routines';
import routine_exercise from './routine_exercise';
import users from './user';


export default (app: Express) => {
  app.use('/users', users);
  app.use('/routines', routines);
  app.use('/exercises', exercises);
  app.use('/routine_exercise', routine_exercise)
  app.use('/data/routine', routine);
  app.use('/data/exercise', exercise);
  app.use('/data/set', set);
}
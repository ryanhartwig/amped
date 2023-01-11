import { Express } from 'express';
import exercises from './exercises';
import exercise from './performance_data/exercise';
import routine from './performance_data/routine';
import set from './performance_data/set';
import routines from './routines';
import routine_exercise from './routine_exercise';
import goals from './user/goals';
import scheduled from './user/scheduled';
import user from './user/user';

export default (app: Express) => {
  app.use('api/user', user);
  app.use('api/user/goals', goals);
  app.use('api/user/scheduled', scheduled);

  app.use('api/routines', routines);
  app.use('api/exercises', exercises);
  app.use('api/routine_exercise', routine_exercise);
  
  app.use('api/data/routine', routine);
  app.use('api/data/exercise', exercise);
  app.use('api/data/set', set);
}
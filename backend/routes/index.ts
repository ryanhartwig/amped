import { Express } from 'express';
import test from "./test";

export default (app: Express) => {
  app.use('/test', test);
  // additional routes here
}
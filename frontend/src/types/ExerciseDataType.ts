/* Performed exercises */

import { SetFieldType } from "./SetFieldType";

export interface ExerciseDataType {
  /**
   * Id of exercise that this data is related to
   */
  exercise_id: string,
  /**
   * Position of the exercise within its routine
   */
  exercise_position: number,
  /**
   * Name of the exercise
   */
  exercise_name: string,
  /**
   * Id of the performed routine that this data belongs to
   */
  routine_data_id: string,
  /**
   * This performed exercise's unique id
   */
  id: string,
  /**
   * Length in seconds this exercise instance took to perform
   */
  duration: number,
  /**
   * Not stored in db, but filled after the fact. 
   * 
   * Each of this exerice's 
   * setFields have a foreign key that is this performed exercise's 
   * exercise_id / primary
   */
  sets: SetFieldType[],
}
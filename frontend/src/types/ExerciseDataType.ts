import { SetFieldType } from "./SetFieldType";

export interface ExerciseDataType {
  /**
   * Id of exercise that this data belongs to
   */
  exercise_id: string,
  /**
   * This data's unique id
   */
  id: string,
  /**
   * Related sets (which will be filled AFTER querying the database)
   */
  sets: SetFieldType[],
  /**
   * Length in seconds this exercise instance took to perform
   */
  duration: number,
}
/* Performed routines */

import { ExerciseDataType } from "./ExerciseDataType";

export interface RoutineDataType {
  /**
   * Id of the routine that this performance belongs to
   */
  routine_id: string,
  /**
   * This performed routine's unique id
   */
  id: string,
  /**
   * Total duration in seconds
   */
  duration: number,
  /**
   * UTC date number
   */
  start_date: number,
  exerciseData: ExerciseDataType[],
  /**
   * User entered notes for this specific session
   */
  notes: string | null,
  /**
   * User entered energy for this specific session
   */
  energy: number | null,
}
import { Intensity } from ".";
import { ExerciseType } from "./ExerciseType";

export interface RoutineExercise {
  id: string,
  position: number,
  user_id: string,
  routine_id: string,
  exercise_id: string,
  exercise: ExerciseType,
}

export interface RoutineType {
  id: string,
  name: string,
  user_id: string,
  /**
   * Approximate duration of the exercise
   */
  est_duration: number,
  /**
   * 1 - 5 intensity rating
   */
  intensity: Intensity,
  type: 'Routine',
  favourited: boolean,
  /**
   * User specified tags for quick filtering 
   */
  tags: string[] | null,
  notes: string | null,
  prev_notes: string | null,
  /**
   * List of exercises this routine includes
   * 
   * This property will not be stored in postgres, but queried and filled after the 
   * routine is fetched
   */
  exercises: RoutineExercise[],
}
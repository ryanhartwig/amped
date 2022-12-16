import { Intensity } from ".";
import { ExerciseType } from "./ExerciseType";

export interface RoutineType {
  name: string,
  exercises: ExerciseType[],
  est_duration: number,
  intensity: Intensity,
  id: string,
  // latestData?: 
  favourited?: boolean,
  tags?: string[],
  notes?: string,
}
import { Intensity } from ".";

export interface ExerciseType {
  id: string, // primary key
  name: string,
  exercise_goal: string,
  muscle_target: string,
  intensity?: Intensity,
  favourited?: boolean,
  notes?: string,
}
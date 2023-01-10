import { Intensity } from ".";

export interface ExerciseType {
  id: string, // primary key
  name: string,
  /**
   * Training type / goal, eg
   * 
   * Strength | hypertrophy | power | speed | endurance
   */
  exercise_goal: string,
  /**
   * Main muscle-group focus for this exercise
   */
  muscle_targets: string[],
  type: 'Exercise',
  favourited: boolean,
  intensity: Intensity,
  notes: string | null,
}
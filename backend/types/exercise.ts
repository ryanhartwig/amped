export interface Exercise {
  id: string,
  user_id: string,
  name: string,
  exercise_goal: string,
  muscle_targets: string,
  type: string,
  favourited: string,
  intensity: number,
  notes: string | null,
} 
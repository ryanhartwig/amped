export interface PerformedExercise {
  id: string,
  exercise_id: string | null,
  performed_routine_id: string,
  exercise_position: number,
  exercise_name: string,
  duration: number,
}
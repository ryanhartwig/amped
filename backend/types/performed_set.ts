export interface PerformedSet {
  id: string,
  performed_exercise_id: string,
  duration: number,
  modifiers: string | null,
  position: number,
  weight: number,
  count: number,
}
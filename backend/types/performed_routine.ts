export interface PerformedRoutine {
  id: string,
  routine_id: string | null,
  user_id: string, 
  duration: number,
  start_date: number,
  notes: string | null,
  energy: number | null,
}
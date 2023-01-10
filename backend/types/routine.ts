export interface Routine {
  id: string,
  user_id: string,
  name: string,
  est_duration: number,
  intensity: number,
  type: string,
  favourited: boolean,
  tags?: string,
  notes?: string,
  prev_notes?: string,
}
export interface Routine {
  id: string,
  user_id: string,
  name: string,
  est_duration: number,
  intensity: number,
  type: string,
  favourited: boolean,
  tags: string | null,
  notes: string | null,
  prev_notes: string | null,
}
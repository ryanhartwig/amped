/* Performed routines */

export interface RoutineDataType {
  /**
   * Id of the routine that this performance belongs to
   */
  routine_id: string,
  /**
   * This performed routine's unique id
   */
  id: string,
  /**
   * Total duration in seconds
   */
  duration: number,
  /**
   * UTC date number
   */
  start_date: number,
  /**
   * User entered notes for this specific session
   */
  post_notes?: string,
  /**
   * User entered energy for this specific session
   */
  energy?: number,
}
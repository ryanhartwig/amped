export interface SetFieldType {
  /**
   * Id of this set
   */
  id: string,
  /**
   * Related exercise data id
   */
  performed_exercise_id: string,
  /**
   * Length of set in seconds
   */
  duration: number,
  /**
   * Set tag
   * 
   * warmup | dropset | hitfailure
   */
  modifiers: Modifier[],
  /**
   * Set number / position
   */
  position: number,
  /**
   * LBS/KG
   */
  weight: number,
  /**
   * Number of repetitions
   */
  count: number,
}

export type Modifier = 'Warmup' | 'Drop Set' | 'Hit Failure';
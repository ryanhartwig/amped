export interface SetFieldType {
  /**
   * Related exercise data id
   */
  exercise_data_id: string,
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
  order: number,
  /**
   * LBS/KG, 0 === bodyweight
   */
  weight: number,
  /**
   * Number of repetitions
   */
  count: number,
}

export type Modifier = 'warmup' | 'dropset' | 'hitfailure';
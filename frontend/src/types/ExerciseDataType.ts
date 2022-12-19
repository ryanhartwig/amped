export interface ExerciseDataType {
  /**
   * Id of exercise that this data is related to
   */
  exercise_id: string,
  /**
   * Id of the performed routine that this data belongs to
   */
  routine_data_id: string,
  /**
   * This performed exercise's unique id
   */
  id: string,
  /**
   * Length in seconds this exercise instance took to perform
   */
  duration: number,
}
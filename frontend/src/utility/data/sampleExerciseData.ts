import { ExerciseDataType } from "../../types/ExerciseDataType";

export const sampleExerciseData: ExerciseDataType[] = [
  // Chest & Triceps
  {
    duration: 452,
    exercise_id: 'chestfly',
    exercise_name: 'Chest Fly',
    exercise_position: 1,
    performed_routine_id: 'chesttriceps',
    id: 'ct-ex1',
    sets: [],
  }, {
    duration: 347,
    exercise_id: 'tricepextension',
    exercise_name: 'Tricep Extension',
    exercise_position: 2,
    performed_routine_id: 'chesttriceps',
    id: 'ct-ex2',
    sets: [],
  }, {
    duration: 601,
    exercise_id: 'floorfly',
    exercise_name: 'Floor Fly',
    exercise_position: 3,
    performed_routine_id: 'chesttriceps',
    id: 'ct-ex3',
    sets: [],
  }, 

  // Shoulders
  {
    duration: 320,
    exercise_id: 'standingshoulderpress',
    exercise_name: 'Standing Shoulder Press',
    exercise_position: 1,
    performed_routine_id: 'chesttriceps',
    id: 'ct-ex3',
    sets: [],
  }, 
]
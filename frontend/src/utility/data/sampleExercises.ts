import uuid from "react-uuid";
import { ExerciseType } from "../../types/ExerciseType";

export const sampleExercises: ExerciseType[] = [
  {
    name: 'Bench Press',
    exercise_goal: 'Strength',
    muscle_target: 'chest',
    id: uuid(),
    intensity: 4,
  }, {
    name: 'Chest Fly',
    exercise_goal: 'Hypertrophy',
    muscle_target: 'chest',
    id: uuid(),
    intensity: 4,
  }, {
    name: 'Incline Bench Press',
    exercise_goal: 'Strength',
    muscle_target: 'chest',
    id: uuid(),
    intensity: 5,
  }, {
    name: 'Bicep Curl',
    exercise_goal: 'Strength',
    muscle_target: 'biceps',
    id: uuid(),
    intensity: 5,
  }, {
    name: 'Hammer Curl',
    exercise_goal: 'Hypertrophy',
    muscle_target: 'biceps',
    id: uuid(),
    intensity: 4,
  }, {
    name: 'Preacher Curl',
    exercise_goal: 'Hypertrophy',
    muscle_target: 'biceps',
    id: uuid(),
    intensity: 5,
  }
]
import { ExerciseType } from "../../types/ExerciseType";

export const sampleExercises: ExerciseType[] = [
  {
    name: 'Bench Press',
    type: 'Exercise',
    exercise_goal: 'strength',
    muscle_target: 'chest',
    id: 'benchpress',
    intensity: 4,
  }, {
    name: 'Chest Fly',
    type: 'Exercise',
    exercise_goal: 'hypertrophy',
    muscle_target: 'chest',
    id: 'chestfly',
    favourited: true,
    intensity: 4,
  }, {
    name: 'Incline Bench Press',
    type: 'Exercise',
    exercise_goal: 'power',
    muscle_target: 'chest',
    id: 'inclinebenchpress',
    intensity: 5,
  }, {
    name: 'Bicep Curl',
    type: 'Exercise',
    exercise_goal: 'strength',
    muscle_target: 'biceps',
    id: 'bicepcurl',
    intensity: 5,
  }, {
    name: 'Hammer Curl',
    type: 'Exercise',
    exercise_goal: 'hypertrophy',
    muscle_target: 'brachioradialis',
    id: 'hammercurl',
    favourited: true,
    intensity: 4,
  }, {
    name: 'Leg Extension',
    type: 'Exercise',
    exercise_goal: 'endurance',
    muscle_target: 'quad',
    id: 'legextension',
    intensity: 5,
  }
]
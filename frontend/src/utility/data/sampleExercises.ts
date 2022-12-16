import { ExerciseType } from "../../types/ExerciseType";

export const sampleExercises: ExerciseType[] = [
  {
    name: 'Bench Press',
    exercise_goal: 'strength',
    muscle_target: 'chest',
    id: 'benchpress',
    intensity: 4,
  }, {
    name: 'Chest Fly',
    exercise_goal: 'hypertrophy',
    muscle_target: 'chest',
    id: 'chestfly',
    favourited: true,
    intensity: 4,
  }, {
    name: 'Incline Bench Press',
    exercise_goal: 'power',
    muscle_target: 'chest',
    id: 'inclinebenchpress',
    intensity: 5,
  }, {
    name: 'Bicep Curl',
    exercise_goal: 'strength',
    muscle_target: 'biceps',
    id: 'bicepcurl',
    intensity: 5,
  }, {
    name: 'Hammer Curl',
    exercise_goal: 'hypertrophy',
    muscle_target: 'brachioradialis',
    id: 'hammercurl',
    favourited: true,
    intensity: 4,
  }, {
    name: 'Leg Extension',
    exercise_goal: 'endurance',
    muscle_target: 'quad',
    id: 'legextension',
    intensity: 5,
  }
]
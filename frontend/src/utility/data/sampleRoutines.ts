import { RoutineType } from "../../types/RoutineType";
import { sampleExercises } from "./sampleExercises";

export const sampleRoutines: RoutineType[] = [
  {
    name: 'Chest & Triceps',
    type: 'Routine',
    est_duration: 50,
    intensity: 4,
    tags: ['endurance'],
    id: 'chesttriceps',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'chest')
      .map((ex, i) => ({exercise: ex, position: i})),
  }, {
    name: 'Biceps',
    type: 'Routine',
    est_duration: 40,
    intensity: 5,
    tags: ['short', 'pull'],
    id: 'biceps',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps')
      .map((ex, i) => ({exercise: ex, position: i})),
    favourited: true,
    notes: 'Go hard',
  }, {
    name: 'Legs',
    type: 'Routine',
    est_duration: 40,
    intensity: 1,
    tags: ['push'],
<<<<<<< HEAD
    id: 'legs',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'quad'),
=======
    id: 'Legs',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps')
      .map((ex, i) => ({exercise: ex, position: i})),
>>>>>>> e0c297b (Use index-based position property on new state array to prevent duplicate keys and allow correctly selecting an nth repeated exercise from a routine's exercise list)
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Abs',
    type: 'Routine',
    est_duration: 40,
    intensity: 5,
<<<<<<< HEAD
    id: 'abs',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'lower abs'),
=======
    id: 'Abs',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps')
      .map((ex, i) => ({exercise: ex, position: i})),
>>>>>>> e0c297b (Use index-based position property on new state array to prevent duplicate keys and allow correctly selecting an nth repeated exercise from a routine's exercise list)
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Shoulders',
    type: 'Routine',
    est_duration: 40,
    intensity: 3,
    tags: ['push'],
<<<<<<< HEAD
    id: 'shoulders',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'front delts'),
=======
    id: 'Shoulders',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps')
      .map((ex, i) => ({exercise: ex, position: i})),
>>>>>>> e0c297b (Use index-based position property on new state array to prevent duplicate keys and allow correctly selecting an nth repeated exercise from a routine's exercise list)
    notes: 'do it',
  }, {
    name: 'Back',
    type: 'Routine',
    est_duration: 40,
    intensity: 2,
    tags: ['annoying'],
<<<<<<< HEAD
    id: 'back',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'low back'),
=======
    id: 'Back',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps')
      .map((ex, i) => ({exercise: ex, position: i})),
>>>>>>> e0c297b (Use index-based position property on new state array to prevent duplicate keys and allow correctly selecting an nth repeated exercise from a routine's exercise list)
    notes: 'do it',
  }
];
import { RoutineType } from "../../types/RoutineType";
import { sampleExercises } from "./sampleExercises";

export const sampleRoutines: RoutineType[] = [
  {
    name: 'Chest & Triceps',
    est_duration: 50,
    intensity: 4,
    tags: ['endurance'],
    id: 'chesttriceps',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'chest'),
  }, {
    name: 'Biceps',
    est_duration: 40,
    intensity: 5,
    tags: ['short', 'pull'],
    id: 'biceps',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps'),
    favourited: true,
    notes: 'Go hard',
  }, {
    name: 'Legs',
    est_duration: 40,
    intensity: 1,
    tags: ['push'],
    id: 'Legs',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps'),
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Abs',
    est_duration: 40,
    intensity: 5,
    id: 'Abs',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps'),
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Shoulders',
    est_duration: 40,
    intensity: 3,
    tags: [],
    id: 'Shoulders',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps'),
    notes: 'do it',
  }, {
    name: 'Back',
    est_duration: 40,
    intensity: 2,
    tags: ['annoying'],
    id: 'Back',
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps'),
    notes: 'do it',
  }
];
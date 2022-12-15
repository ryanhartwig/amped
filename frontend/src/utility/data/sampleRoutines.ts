import uuid from "react-uuid";
import { RoutineType } from "../../types/RoutineType";
import { sampleExercises } from "./sampleExercises";

export const sampleRoutines: RoutineType[] = [
  {
    name: 'Chest & Triceps',
    est_duration: 40,
    intensity: 5,
    tags: ['endurance'],
    id: uuid(),
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'chest'),
  }, {
    name: 'Biceps',
    est_duration: 40,
    intensity: 5,
    tags: ['short version'],
    id: uuid(),
    exercises: sampleExercises.filter(ex => ex.muscle_target === 'biceps'),
    favourited: true,
    notes: 'Go hard',
  }
];
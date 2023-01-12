import uuid from "react-uuid";
import { RoutineType } from "../../types/RoutineType";
import { sampleExercises } from "./sampleExercises";

export const sampleRoutines: RoutineType[] = [
  {
    name: 'Chest & Triceps',
    user_id: 'admin',
    notes: null,
    prev_notes: null,
    type: 'Routine',
    est_duration: 50,
    intensity: 4,
    tags: ['endurance'],
    id: 'chesttriceps',
    favourited: false,
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('chest'))
      .map((ex, i) => ({exercise: ex, position: i, exercise_id: ex.id, id: uuid(), routine_id: 'chesttriceps', user_id: 'admin'})),
  }, {
    name: 'Biceps',
    user_id: 'admin',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 5,
    tags: ['short', 'pull'],
    id: 'biceps',
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i, exercise_id: ex.id, id: uuid(), routine_id: 'biceps', user_id: 'admin'})),
    favourited: true,
    notes: 'Go hard',
  }, {
    name: 'Legs',
    user_id: 'admin',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 1,
    tags: ['push'],
    id: 'Legs',
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i, exercise_id: ex.id, id: uuid(), routine_id: 'Legs', user_id: 'admin'})),
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Abs',
    user_id: 'admin',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 5,
    tags: null,
    id: 'Abs',
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i, exercise_id: ex.id, id: uuid(), routine_id: 'Abs', user_id: 'admin'})),
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Shoulders',
    user_id: 'admin',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 3,
    tags: ['push'],
    id: 'Shoulders',
    favourited: false,
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i, exercise_id: ex.id, id: uuid(), routine_id: 'Shoulders', user_id: 'admin'})),
    notes: 'do it',
  }, {
    name: 'Back',
    user_id: 'admin',
    type: 'Routine',
    est_duration: 40,
    intensity: 2,
    tags: ['annoying'],
    id: 'Back',
    favourited: false,
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i, exercise_id: ex.id, id: uuid(), routine_id: 'Back', user_id: 'admin'})),
    notes: 'do it',
    prev_notes: `Focus lat contraction
    
    
Lower weight to challenge proper muscle groups. 
  - keep movements quick and controlled`, 
  }
];
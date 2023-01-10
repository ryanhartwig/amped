import { RoutineType } from "../../types/RoutineType";
import { sampleExercises } from "./sampleExercises";

export const sampleRoutines: RoutineType[] = [
  {
    name: 'Chest & Triceps',
    notes: null,
    prev_notes: null,
    type: 'Routine',
    est_duration: 50,
    intensity: 4,
    tags: ['endurance'],
    id: 'chesttriceps',
    favourited: false,
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('chest'))
      .map((ex, i) => ({exercise: ex, position: i})),
  }, {
    name: 'Biceps',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 5,
    tags: ['short', 'pull'],
    id: 'biceps',
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i})),
    favourited: true,
    notes: 'Go hard',
  }, {
    name: 'Legs',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 1,
    tags: ['push'],
    id: 'Legs',
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i})),
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Abs',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 5,
    tags: null,
    id: 'Abs',
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i})),
    favourited: true,
    notes: 'do it',
  }, {
    name: 'Shoulders',
    prev_notes: null,
    type: 'Routine',
    est_duration: 40,
    intensity: 3,
    tags: ['push'],
    id: 'Shoulders',
    favourited: false,
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i})),
    notes: 'do it',
  }, {
    name: 'Back',
    type: 'Routine',
    est_duration: 40,
    intensity: 2,
    tags: ['annoying'],
    id: 'Back',
    favourited: false,
    exercises: sampleExercises.filter(ex => ex.muscle_targets.includes('biceps'))
      .map((ex, i) => ({exercise: ex, position: i})),
    notes: 'do it',
    prev_notes: `Focus lat contraction
    
    
Lower weight to challenge proper muscle groups. 
  - keep movements quick and controlled`, 
  }
];
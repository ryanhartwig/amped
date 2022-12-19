import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseType } from "../../types/ExerciseType";
import { RoutineType } from "../../types/RoutineType";
import { sampleExercises } from "../../utility/data/sampleExercises";
import { sampleRoutines } from "../../utility/data/sampleRoutines";


interface WorkoutsState { 
  routines: RoutineType[],
  exercises: ExerciseType[],
}

// Will fetch from db when using real data
const initialState: WorkoutsState = {
  routines: sampleRoutines,
  exercises: sampleExercises,
}

export const workoutsReducer = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<RoutineType | ExerciseType>) => {
      if (action.payload.type === 'Exercise') state.exercises.push(action.payload);
      else (state.routines.push(action.payload));
    }, 
    removeWorkout: (state, action: PayloadAction<{type: 'Routine' | 'Exercise', id: string}>) => {
      const { type, id } = action.payload;
      if (type === 'Routine') {
        state.routines = state.routines.filter(r => r.id !== id);
      } else {
        state.exercises = state.exercises.filter(e => e.id !== id);
      }
    },
  }
});

export const { addWorkout, removeWorkout } = workoutsReducer.actions;

export default workoutsReducer.reducer;

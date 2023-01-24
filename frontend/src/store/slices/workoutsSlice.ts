import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseType } from "../../types/ExerciseType";
import { RoutineType } from "../../types/RoutineType";


interface WorkoutsState { 
  routines: RoutineType[],
  exercises: ExerciseType[],
}

// Will fetch from db when using real data
const initialState: WorkoutsState = {
  routines: [],
  exercises: [],
}

export const workoutsReducer = createSlice({
  name: 'workouts',
  initialState: initialState,
  reducers: {
    addWorkout: (state, action: PayloadAction<RoutineType | ExerciseType>) => {
      if (action.payload.type === 'Exercise') state.exercises.push(action.payload);
      else (state.routines.push(action.payload));
    }, 
    removeWorkout: (state, action: PayloadAction<RoutineType | ExerciseType>) => {
      if (action.payload.type === 'Exercise') {
        state.exercises = state.exercises.filter(e => e.id !== action.payload.id);
      } else {
        state.routines = state.routines.filter(r => r.id !== action.payload.id);
      }
    },
    editWorkout: (state, action: PayloadAction<RoutineType | ExerciseType>) => {
      if (action.payload.type === 'Routine') {
        const index = state.routines.findIndex(r => r.id === action.payload.id);
        state.routines[index] = action.payload;      
      } else {
        const index = state.exercises.findIndex(e => e.id === action.payload.id);
        state.exercises[index] = action.payload;      
      }
    },
    setRoutines: (state, action: PayloadAction<RoutineType[]>) => {
      state.routines = action.payload;
    },
    setExercises: (state, action: PayloadAction<ExerciseType[]>) => {
      state.exercises = action.payload;
    },
  }
});

export const { addWorkout, removeWorkout, editWorkout, setRoutines, setExercises } = workoutsReducer.actions;

export default workoutsReducer.reducer;

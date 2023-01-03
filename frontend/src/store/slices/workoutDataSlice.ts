import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseDataType } from "../../types/ExerciseDataType";
import { RoutineDataType } from "../../types/RoutineDataType";
import { sampleExerciseData } from "../../utility/data/sampleExerciseData";
import { sampleRoutineData } from "../../utility/data/sampleRoutineData";


interface WorkoutDataState { 
  routineData: RoutineDataType[],
  exerciseData: ExerciseDataType[],
}

// Will fetch from db when using real data
const initialState: WorkoutDataState = {
  routineData: sampleRoutineData,
  exerciseData: sampleExerciseData,
}

export const workoutDataReducer = createSlice({
  name: 'workoutData',
  initialState: initialState,
  reducers: {
    addEditRoutineData: (state, action: PayloadAction<RoutineDataType>) => {
      const index = state.routineData.findIndex(d => d.id === action.payload.id);

      if (index === -1) {
        state.routineData.push(action.payload);
      } else {
        state.routineData[index] = action.payload;
      }
    },
    addEditExerciseData: (state, action: PayloadAction<ExerciseDataType>) => {
      const index = state.exerciseData.findIndex(d => d.id === action.payload.id);

      if (index === -1) {
        state.exerciseData.push(action.payload);
      } else {
        state.exerciseData[index] = action.payload;
      }
    },
  }
});

export const { addEditRoutineData, addEditExerciseData } = workoutDataReducer.actions;

export default workoutDataReducer.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ExerciseDataType } from "../../types/ExerciseDataType";
import { RoutineDataType } from "../../types/RoutineDataType";
import { sampleExerciseData } from "../../utility/data/sampleExerciseData";
import { sampleRoutineData } from "../../utility/data/sampleRoutineData";
import { RootState } from "../store";


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

export const completedRoutinesToday = (s: RootState) => {
  const now = new Date();

  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return s.workoutData.routineData.filter(d => d.start_date > now.getTime());
}

export default workoutDataReducer.reducer;

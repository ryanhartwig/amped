import { createSlice } from "@reduxjs/toolkit";
import { ExerciseDataType } from "../../types/ExerciseDataType";
import { RoutineDataType } from "../../types/RoutineDataType";
import { sampleExerciseData } from "../../utility/data/sampleExerciseData";
import { sampleRoutineData } from "../../utility/data/sampleRoutineData";


interface WorkoutsState { 
  routineData: RoutineDataType[],
  exerciseData: ExerciseDataType[],
}

// Will fetch from db when using real data
const initialState: WorkoutsState = {
  routineData: sampleRoutineData,
  exerciseData: sampleExerciseData,
}

export const workoutDataReducer = createSlice({
  name: 'workoutData',
  initialState: initialState,
  reducers: {
  }
});

// export const {  } = workoutDataReducer.actions;

export default workoutDataReducer.reducer;

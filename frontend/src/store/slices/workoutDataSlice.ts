import { createSlice } from "@reduxjs/toolkit";
import { RoutineDataType } from "../../types/RoutineDataType";
import { sampleRoutineData } from "../../utility/data/sampleRoutineData";


interface WorkoutsState { 
  routineData: RoutineDataType[],
  // exerciseData: ExerciseDataType[],
}

// Will fetch from db when using real data
const initialState: WorkoutsState = {
  routineData: sampleRoutineData,
  // exerciseData: sampleExercises,
}

export const workoutDataReducer = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
  }
});

// export const {  } = workoutDataReducer.actions;

export default workoutDataReducer.reducer;

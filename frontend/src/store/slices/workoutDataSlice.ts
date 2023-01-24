import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoutineDataType } from "../../types/RoutineDataType";
import { RootState } from "../store";


interface WorkoutDataState { 
  routineData: RoutineDataType[],
}

// Will fetch from db when using real data
const initialState: WorkoutDataState = {
  routineData: [],
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
    setRoutineData: (state, action: PayloadAction<RoutineDataType[]>) => {
      state.routineData = action.payload;
    }
  }
});

export const { addEditRoutineData, setRoutineData } = workoutDataReducer.actions;

export const selectCompletedToday = (s: RootState) => {
  const now = new Date();

  now.setHours(0);
  now.setMinutes(0);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return s.workoutData.routineData.filter(d => d.start_date > now.getTime());
}

export default workoutDataReducer.reducer;

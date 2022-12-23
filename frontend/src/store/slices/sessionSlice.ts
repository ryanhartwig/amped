import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoutineType } from "../../types/RoutineType";

interface SessionState {
  selectedRoutine?: RoutineType,
  currentPosition: number,
}

const initialState: SessionState = {
  currentPosition: 0,
}

export const sessionReducer = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSelectedRoutine: (state, action: PayloadAction<RoutineType>) => {
      state.selectedRoutine = action.payload;
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.currentPosition = action.payload
    },
  }
});

export const { setSelectedRoutine, setPosition } = sessionReducer.actions;

export default sessionReducer.reducer;

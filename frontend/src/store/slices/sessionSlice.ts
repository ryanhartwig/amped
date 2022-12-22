import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoutineType } from "../../types/RoutineType";

interface SessionState {
  selectedRoutine?: RoutineType | 'anonymous',
}

const initialState: SessionState = {
}

export const sessionReducer = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSelectedRoutine: (state, action: PayloadAction<RoutineType | 'anonymous'>) => {
      state.selectedRoutine = action.payload;
    },
  }
});

export const { setSelectedRoutine } = sessionReducer.actions;

export default sessionReducer.reducer;

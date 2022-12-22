import { createSlice } from "@reduxjs/toolkit";
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
  }
});

// export const {  } = sessionReducer.actions;

export default sessionReducer.reducer;

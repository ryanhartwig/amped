import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { ExerciseDataType } from "../../types/ExerciseDataType";

interface SessionState {
  selectedRoutineId?: string,
  session_id?: string,
  currentPosition?: number,
  sessionStartDate?: Date,
  exerciseData?: ExerciseDataType[],
}

const initialState: SessionState = {
}

export const sessionReducer = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSelectedRoutine: (state, action: PayloadAction<string>) => {
      state.selectedRoutineId = action.payload;
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.currentPosition = action.payload
    },
    initializeSession: (state) => {
      state.session_id = uuid();
      state.currentPosition = 0;
      state.sessionStartDate = new Date();
      state.exerciseData = [];
    },
    clearSession: (state) => {
      return {};
    },
  }
});

export const { setSelectedRoutine, setPosition, initializeSession, clearSession } = sessionReducer.actions;

export default sessionReducer.reducer;

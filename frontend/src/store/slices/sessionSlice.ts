import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { ExerciseDataType } from "../../types/ExerciseDataType";
import { RootState } from "../store";

interface SessionState {
  selectedRoutineId?: string,
  session_id?: string,
  currentPosition?: number,
  sessionStartDate?: number,
  exerciseData?: ExerciseDataType[],
  showSummary: boolean,
}

const initialState: SessionState = {
  showSummary: false,
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
      state.sessionStartDate = (new Date()).getTime();
      state.exerciseData = [];
    },
    clearSession: () => {
      return initialState;
    },
    setExerciseData: (state, action: PayloadAction<ExerciseDataType>) => {
      if (!state.exerciseData) return;

      const index = state.exerciseData.findIndex(ex => ex.id === action.payload.id);

      if (index === -1) {
        state.exerciseData.push(action.payload);
      } else {
        state.exerciseData[index] = action.payload;
      }
    },
    setShowSummary: (state, action: PayloadAction<boolean>) => {
      state.showSummary = action.payload;
    },
  }
});

export const { setSelectedRoutine, setShowSummary, setPosition, initializeSession, clearSession, setExerciseData } = sessionReducer.actions;

export const selectSessionData = (s: RootState) => ({
  selectedRoutineId: s.session.selectedRoutineId,
  session_id: s.session.session_id,
  sessionStartDate: s.session.sessionStartDate,
  exerciseData: s.session.exerciseData,
})

export default sessionReducer.reducer;

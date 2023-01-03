import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { ExerciseDataType } from "../../types/ExerciseDataType";
import { sampleSessionData } from "../../utility/data/sampleSession";
import { RootState } from "../store";

export interface SessionState {
  selectedRoutineId: string,
  session_duration: number,
  session_id: string,
  currentPosition: number,
  sessionStartDate: number,
  exerciseData: ExerciseDataType[],
  showSummary: boolean,
}

const initialState: SessionState = {
  selectedRoutineId: '',
  session_duration: 0,
  session_id: '',
  currentPosition: 0,
  sessionStartDate: 0,
  exerciseData: [],
  showSummary: false,
}

export const sessionReducer = createSlice({
  name: 'session',
  initialState: sampleSessionData,
  reducers: {
    setSelectedRoutine: (state, action: PayloadAction<string>) => {
      state.selectedRoutineId = action.payload;
    },
    setPosition: (state, action: PayloadAction<number>) => {
      state.currentPosition = action.payload
    },
    setDuration: (state, action: PayloadAction<number>) => {
      state.session_duration = action.payload;
    },
    initializeSession: (state) => {
      state.session_id = uuid();
      state.currentPosition = 0;
      state.session_duration = 0;
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

export const { setSelectedRoutine, setShowSummary, setPosition, initializeSession, clearSession, setExerciseData, setDuration } = sessionReducer.actions;

export const selectSessionData = (s: RootState) => ({
  selectedRoutineId: s.session.selectedRoutineId,
  session_duration: s.session.session_duration,
  session_id: s.session.session_id,
  sessionStartDate: s.session.sessionStartDate,
  exerciseData: s.session.exerciseData,
})

export default sessionReducer.reducer;

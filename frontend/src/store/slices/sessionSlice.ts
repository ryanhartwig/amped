import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { ExerciseDataType } from "../../types/ExerciseDataType";
import { RoutineDataType } from "../../types/RoutineDataType";
import { sampleSessionData } from "../../utility/data/sampleSession";

export interface SessionState {
  selectedRoutineId: string,
  session_id: string,
  routine_id: string,
  currentPosition: number,
  sessionStartDate: number,
  exerciseData: ExerciseDataType[],
  summaryData?: RoutineDataType,
}

const initialState: SessionState = {
  selectedRoutineId: '',
  session_id: '',
  routine_id: '',
  currentPosition: 0,
  sessionStartDate: 0,
  exerciseData: [],
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
    initializeSession: (state) => {
      state.session_id = uuid();
      state.currentPosition = 0;
      state.routine_id = state.selectedRoutineId;
      state.sessionStartDate = (new Date()).getTime();
      state.exerciseData = [];
    },
    clearSession: () => {
      return initialState;
    },
    addEditExerciseData: (state, action: PayloadAction<ExerciseDataType>) => {
      const index = state.exerciseData.findIndex(ex => ex.id === action.payload.id);

      if (index === -1) {
        state.exerciseData.push(action.payload);
      } else {
        state.exerciseData[index] = action.payload;
      }
    },
    setSummaryData: (state, action: PayloadAction<RoutineDataType | undefined>) => {
      state.summaryData = action.payload;
    },
  }
});

export const { setSelectedRoutine, setSummaryData, setPosition, initializeSession, clearSession, addEditExerciseData } = sessionReducer.actions;

export default sessionReducer.reducer;

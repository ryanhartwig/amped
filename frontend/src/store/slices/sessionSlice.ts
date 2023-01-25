import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { ExerciseDataType } from "../../types/ExerciseDataType";

export interface SessionState {
  selectedRoutineId: string | null,
  session_id: string,
  routine_id: string | null,
  currentPosition: number,
  sessionStartDate: number,
  exerciseData: ExerciseDataType[],
  routineSummaryId?: string,
}


const initialState: SessionState = {
  selectedRoutineId: null,
  session_id: '',
  routine_id: null,
  currentPosition: 0,
  sessionStartDate: 0,
  exerciseData: [],
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
    setRoutineSummaryId: (state, action: PayloadAction<string | undefined>) => {
      state.routineSummaryId = action.payload;
    },
  }
});

export const { setSelectedRoutine, setRoutineSummaryId, setPosition, initializeSession, clearSession, addEditExerciseData } = sessionReducer.actions;

export default sessionReducer.reducer;

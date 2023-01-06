import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "../../types/Goal";
import { scheduled, ScheduledState } from "../../types/scheduledState";

interface UserState {
  scheduled: ScheduledState,
  goals: GoalType[],
}

const initialState: UserState = {
  scheduled,
  goals: [],
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addEditGoal: (state, action: PayloadAction<GoalType>) => {
      const index = state.goals.findIndex(g => g.id === action.payload.id);

      if (index === -1) state.goals.push(action.payload);
      else state.goals[index] = action.payload;
    },
    deleteGoal: (state, action: PayloadAction<string>) => {
      state.goals = state.goals.filter(g => g.id !== action.payload)
    }
  }
});

export const { addEditGoal, deleteGoal } = userReducer.actions;

export default userReducer.reducer;

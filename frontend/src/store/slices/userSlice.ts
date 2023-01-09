import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "../../types/GoalType";
import { scheduled, ScheduledState } from "../../types/scheduledState";

export type DaysTrained = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface UserState {
  scheduled: ScheduledState,
  goals: GoalType[],
  weeklyTarget: DaysTrained,
}

const initialState: UserState = {
  scheduled,
  goals: [],
  weeklyTarget: 3,
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
    },
    setWeeklyTarget: (state, action: PayloadAction<DaysTrained>) => {
      state.weeklyTarget = action.payload
    }, 
  }
});

export const { addEditGoal, setWeeklyTarget, deleteGoal } = userReducer.actions;

export default userReducer.reducer;

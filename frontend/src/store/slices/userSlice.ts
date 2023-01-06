import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Goal } from "../../types/Goal";
import { scheduled, ScheduledState } from "../../types/scheduledState";

interface UserState {
  scheduled: ScheduledState,
  goals: Goal[],
}

const initialState: UserState = {
  scheduled,
  goals: [],
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addEditGoal: (state, action: PayloadAction<Goal>) => {
      const index = state.goals.findIndex(g => g.id === action.payload.id);

      if (index === -1) state.goals.push(action.payload);
      else state.goals[index] = action.payload;
    },
  }
});

export const { addEditGoal } = userReducer.actions;

export default userReducer.reducer;

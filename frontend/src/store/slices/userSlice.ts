import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "../../types/GoalType";
import { ScheduledRoutine } from "../../types/scheduledState";

export interface UserState {
  scheduled: ScheduledRoutine[],
  goals: GoalType[],
  weekly_target: number,
  name: string,
  email: string,
  id: string,
}

const initialState: UserState = {
  scheduled: [],
  goals: [],
  weekly_target: 0,
  name: '',
  email: '',
  id: '',
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
    setWeeklyTarget: (state, action: PayloadAction<number>) => {
      state.weekly_target = action.payload;
    }, 
    setGoals: (state, action: PayloadAction<GoalType[]>) => {
      state.goals = action.payload;
    },
    setUser: (state, action: PayloadAction<Partial<UserState> | undefined>) => {
      if (!action.payload) return initialState;
      
      return {
        ...state,
        ...action.payload,
      }
    },
    setScheduled: (state, action: PayloadAction<ScheduledRoutine[]>) => {
      state.scheduled = action.payload;
    }
  }
});

export const { addEditGoal, setWeeklyTarget, deleteGoal, setScheduled, setGoals, setUser } = userReducer.actions;

export default userReducer.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DB_User } from "../../api/injections/user/userSlice";
import { GoalType } from "../../types/GoalType";
import { ScheduledRoutine } from "../../types/scheduledState";

interface UserState {
  scheduled: ScheduledRoutine[],
  goals: GoalType[],
  weekly_target: number,
  name: string,
  email: string,
  id: string,
  authenticated: boolean,
}

const initialState: UserState = {
  scheduled: [],
  goals: [],
  weekly_target: 0,
  name: '',
  email: '',
  id: '',
  authenticated: false,
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
    setUser: (state, action: PayloadAction<DB_User>) => {
      const { weekly_target, email, id, name } = action.payload;
      return {
        ...state,
        weekly_target,
        email,
        id,
        name
      }
    }
  }
});

export const { addEditGoal, setWeeklyTarget, deleteGoal, setGoals, setUser } = userReducer.actions;

export default userReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { scheduled, ScheduledState } from "../../types/scheduledState";

interface UserState {
  scheduled: ScheduledState,
}

const initialState: UserState = {
  scheduled,
}

export const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
  }
});

// export const {  } = userReducer.actions;

export default userReducer.reducer;

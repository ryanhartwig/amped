import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import workoutsSlice from './slices/workoutsSlice';
import themeSlice from './slices/themeSlice';
import workoutDataSlice from './slices/workoutDataSlice';
import userSlice from './slices/userSlice';
import sessionSlice from './slices/sessionSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    workouts: workoutsSlice,
    workoutData: workoutDataSlice,
    user: userSlice,
    session: sessionSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

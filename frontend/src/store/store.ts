import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import workoutsSlice from './slices/workoutsSlice';
import themeSlice from './slices/themeSlice';
import workoutDataSlice from './slices/workoutDataSlice';

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    workouts: workoutsSlice,
    workoutData: workoutDataSlice,
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

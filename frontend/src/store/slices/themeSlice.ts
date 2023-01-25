import { createSlice } from "@reduxjs/toolkit";

export interface Tags {
  Strength: string,
  Hypertrophy: string,
  Power: string,
  Speed: string,
  Endurance: string,
}
export interface ThemeState {
  background: string,
  background_alt: string,
  background_routine: string,
  foreground: string,
  foregroundAlt: string,
  buttonPrimary: string,
  buttonSecondary: string,
  tags: Tags
}

export const initialState: ThemeState = {
  background: '#262424', // #262424
  background_alt: '#302D2D',
  background_routine: '#232323',
  foreground: '#0C2E4E',
  foregroundAlt: '#0C2E4E',
  buttonPrimary: '#1C476F',
  buttonSecondary: '#0C2E4E',
  tags: {
    Strength: '#3c2828',
    Hypertrophy: '#3c3c28',
    Power: '#3c3428',
    Speed: '#3c2831',
    Endurance: '#28393c',
  }
}

export const themeReducer = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
  }
});

// export const {  } = themeReducer.actions;

export default themeReducer.reducer;

import { createSlice } from "@reduxjs/toolkit";

export interface Tags {
  strength: string,
  hypertrophy: string,
  power: string,
  speed: string,
  endurance: string,
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
  background: '#262424',
  background_alt: '#302D2D',
  background_routine: '#232323',
  foreground: '#0C2E4E',
  foregroundAlt: '#0C2E4E',
  buttonPrimary: '#1C476F',
  buttonSecondary: '#0C2E4E',
  tags: {
    strength: '#3c2828',
    hypertrophy: '#3c3c28',
    power: '#3c3428',
    speed: '#3c2831',
    endurance: '#28393c',
  }
}

export const themeReducer = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    // (eventual) change theme (light / dark) action
  }
});

// export const {  } = themeReducer.actions;

export default themeReducer.reducer;

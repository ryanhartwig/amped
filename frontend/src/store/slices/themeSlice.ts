import { createSlice } from "@reduxjs/toolkit";

export interface ThemeState {
  background: string,
  background_alt: string,
  foreground: string,
  foregroundAlt: string,
  buttonPrimary: string,
  buttonSecondary: string,
}

export const initialState: ThemeState = {
  background: '#262424',
  background_alt: '#262424',
  foreground: '#0C2E4E',
  foregroundAlt: '#0C2E4E',
  buttonPrimary: '#1C476F',
  buttonSecondary: '#0C2E4E',
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

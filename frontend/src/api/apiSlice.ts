import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api', 
  }),
  tagTypes: [
    'Routines', 
    'Exercises', 
    'RtEx', 
    'Goals', 
    'User',
    'RoutineData',
    'ExerciseData',
    'SetData',
  ],
  endpoints: () => ({
  }),
})

// export const { 
// } = apiSlice;
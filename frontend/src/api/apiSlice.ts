import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '../utility/data/baseUrl';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl, 
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
    'Scheduled'
  ],
  endpoints: builder => ({
    getAuth: builder.query({
      query: () => '/login/federated/facebook',
    })
  }),
})

export const { 
  useGetAuthQuery,
} = apiSlice;
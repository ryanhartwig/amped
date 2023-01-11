import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api', 
  }),
  tagTypes: ['Routines', 'Exercises'],
  endpoints: builder => ({
    getExercises: builder.query({
      query: (user_id: string) => `/exercises/${user_id}`
    }),
  }),
})

export const { 
  useGetExercisesQuery,
} = apiSlice;
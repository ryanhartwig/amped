import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:8000/api' }),
  endpoints: builder => ({
    getRoutines: builder.query({
      query: (user_id: string) => `/routines/${user_id}`
    }),
    getExercises: builder.query({
      query: (user_id: string) => `/exercises/${user_id}`
    })
  }),
})

export const { useGetRoutinesQuery, useGetExercisesQuery } = apiSlice;
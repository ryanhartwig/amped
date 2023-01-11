import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RoutineType } from '../types/RoutineType';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery( { baseUrl: 'http://localhost:8000/api' }),
  endpoints: builder => ({
    getRoutines: builder.query({
      query: (user_id: string) => `/routines/${user_id}`
    }),
    addNewRoutine: builder.mutation({
      query: (routine: RoutineType) => ({
        url: '/routines/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          ...routine,
          exercises: undefined,
          tags: routine.tags?.join('-') || null,
        }
      })
    }),
    getExercises: builder.query({
      query: (user_id: string) => `/exercises/${user_id}`
    })
  }),
})

export const { useGetRoutinesQuery, useGetExercisesQuery, useAddNewRoutineMutation } = apiSlice;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RoutineType } from '../types/RoutineType';

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:8000/api', 
  }),
  tagTypes: ['Routines'],
  endpoints: builder => ({
    getRoutines: builder.query({
      query: (user_id: string) => `/routines/${user_id}`,
      providesTags: ['Routines'],
    }),
    addNewRoutine: builder.mutation({
      query: (routine: RoutineType) => ({
        url: '/routines/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...routine,
          exercises: undefined,
          tags: routine.tags?.join('-') || null,
        }
      }),
      invalidatesTags: ['Routines'],
    }),
    editRoutine: builder.mutation({
      query: (routine: Partial<RoutineType>) => ({
        url: `/routines/${routine.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...routine,
          exercises: undefined,
          tags: routine.tags?.join('-') || null,
        }
      }),
      invalidatesTags: ['Routines'],
    }),
    deleteRoutine: builder.mutation({
      query: (id: string) => ({
        url: `/routines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routines'],
    }),
    getExercises: builder.query({
      query: (user_id: string) => `/exercises/${user_id}`
    }),

  }),
})

export const { 
  useGetRoutinesQuery,
  useEditRoutineMutation,
  useAddNewRoutineMutation,
  useDeleteRoutineMutation,
  useGetExercisesQuery,
} = apiSlice;
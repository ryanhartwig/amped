import { apiSlice } from "../../apiSlice";

export interface DB_RoutineExercise {
  id: string,
  routine_id: string,
  exercise_id: string,
  position: number,
  user_id: string,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addRoutineExercise: builder.mutation({
      query: (routineEx: DB_RoutineExercise) => ({
        url: '/routine_exercise/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: routineEx,
      }),
      invalidatesTags: ['Routines', 'RtEx'],
    }),
    getRoutineExercises: builder.query({
      query: (user_id: string) => `/routine_exercise/${user_id}`,
      providesTags: ['RtEx'],
    }),
    deleteRoutineExercise: builder.mutation({
      query: (id: string) => ({
        url: `/routine_exercise/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RtEx'],
    })
  })
})

export const {
  useAddRoutineExerciseMutation,
  useGetRoutineExercisesQuery,
  useDeleteRoutineExerciseMutation,
} = extendedApiSlice;
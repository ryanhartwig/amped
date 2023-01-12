import { ExerciseType } from "../../../types/ExerciseType";
import { GoalType } from "../../../types/GoalType";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addNewExercise: builder.mutation({
      query: (goal: GoalType) => ({
        url: '/user/goals/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: goal
      }),
      invalidatesTags: ['Goals'],
    }),
    getExercises: builder.query({
      query: (user_id: string) => `/user/goals/${user_id}`,
      providesTags: ['Goals'],
    }),
    editExercise: builder.mutation({
      query: (goal: GoalType) => ({
        url: `/user/goals/${goal.user_id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: goal
      }),
      invalidatesTags: ['Goals'],
    }),
    deleteExercise: builder.mutation({
      query: (id: string) => ({
        url: `/user/goals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goals'],
    }),
  })
});

export const {
  useAddNewExerciseMutation,
  useGetExercisesQuery,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
} = extendedApiSlice;
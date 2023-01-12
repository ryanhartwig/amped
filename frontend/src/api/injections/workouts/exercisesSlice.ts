import { ExerciseType } from "../../../types/ExerciseType";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addNewExercise: builder.mutation({
      query: (exercise: ExerciseType) => ({
        url: '/exercises/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...exercise,
          muscle_targets: exercise.muscle_targets?.join('-') || null,
        }
      }),
      invalidatesTags: ['Exercises'],
    }),
    getExercises: builder.query({
      query: (user_id: string) => `/exercises/${user_id}`,
      providesTags: ['Exercises'],
      transformResponse: (res: any) => {
        return res.map((e: any) => ({
          ...e,
          muscle_targets: e.muscle_targets?.split('-') || [],
        }))
      }
    }),
    editExercise: builder.mutation({
      query: (exercise: Partial<ExerciseType>) => ({
        url: `/exercises/${exercise.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...exercise,
          muscle_targets: exercise.muscle_targets?.join('-') || null,
        }
      }),
      invalidatesTags: ['Exercises'],
    }),
    deleteExercise: builder.mutation({
      query: (id: string) => ({
        url: `/exercises/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Exercises', 'RtEx'],
    }),
  })
});

export const {
  useAddNewExerciseMutation,
  useGetExercisesQuery,
  useEditExerciseMutation,
  useDeleteExerciseMutation,
} = extendedApiSlice;
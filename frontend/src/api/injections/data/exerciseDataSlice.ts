import { ExerciseDataType } from "../../../types/ExerciseDataType";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addExerciseData: builder.mutation({
      query: (data: ExerciseDataType) => ({
        url: '/data/exercise/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...data,
          sets: undefined,
        }
      }),
      invalidatesTags: ['ExerciseData'],
    }),
    getExerciseData: builder.query({
      query: (routine_id: string) => `/data/exercise/${routine_id}`,
      providesTags: ['ExerciseData'],
      transformResponse: (res: ExerciseDataType[]) => res.map(d => ({
        ...d, 
        sets: [],
      }))
    }),
    editExerciseData: builder.mutation({
      query: (data: ExerciseDataType) => ({
        url: `/data/exercise/${data.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...data,
          sets: undefined,
        }
      }),
      invalidatesTags: ['ExerciseData'],
    }),
    deleteExerciseData: builder.mutation({
      query: (id: string) => ({
        url: `/data/exercise/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['ExerciseData'],
    }),
  })
});

export const {
  useAddExerciseDataMutation,
  useGetExerciseDataQuery,
  useEditExerciseDataMutation,
  useDeleteExerciseDataMutation,
} = extendedApiSlice;
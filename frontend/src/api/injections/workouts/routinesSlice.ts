import { RoutineType } from "../../../types/RoutineType";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
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
    getRoutines: builder.query({
      query: (user_id: string) => `/routines/${user_id}`,
      providesTags: ['Routines'],
      transformResponse: (res: any) => {
        return res.map((r: any) => ({
          ...r,
          exercises: [],
          tags: r.tags?.split('-') || null,
        }))
      }
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
      invalidatesTags: ['Routines', 'RtEx'],
    }),
    deleteRoutine: builder.mutation({
      query: (id: string) => ({
        url: `/routines/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Routines', 'RtEx'],
    }),
  })
});

export const {
  useAddNewRoutineMutation,
  useGetRoutinesQuery,
  useEditRoutineMutation,
  useDeleteRoutineMutation,
} = extendedApiSlice;
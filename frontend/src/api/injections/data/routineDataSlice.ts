import { RoutineDataType } from "../../../types/RoutineDataType";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addRoutineData: builder.mutation({
      query: (data: RoutineDataType) => ({
        url: '/data/routine/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...data,
          exerciseData: undefined,
        }
      }),
      invalidatesTags: ['RoutineData'],
    }),
    getRoutineData: builder.query({
      query: (user_id: string) => `/data/routine/${user_id}`,
      providesTags: ['RoutineData'],
      transformResponse: (res: RoutineDataType[]) => res.map(d => ({
        ...d, 
        start_date: Number(d.start_date),
        exerciseData: [],
      }))
    }),
    editRoutineData: builder.mutation({
      query: (data: RoutineDataType) => ({
        url: `/data/routine/${data.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...data,
          exerciseData: undefined,
        }
      }),
      invalidatesTags: ['RoutineData'],
    }),
    deleteRoutineData: builder.mutation({
      query: (id: string) => ({
        url: `/data/routine/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['RoutineData'],
    }),
  })
});

export const {
  useAddRoutineDataMutation,
  useGetRoutineDataQuery,
  useEditRoutineDataMutation,
  useDeleteRoutineDataMutation,
} = extendedApiSlice;
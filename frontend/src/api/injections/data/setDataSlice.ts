import { SetFieldType } from "../../../types/SetFieldType";
import { apiSlice } from "../../apiSlice";

export interface DB_Set {
  id: string,
  performed_exercise_id: string,
  duration: number,
  modifiers: string,
  position: number,
  weight: number,
  count: number,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addSetData: builder.mutation({
      query: (data: SetFieldType) => ({
        url: '/data/set/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...data,
          modifiers: data.modifiers.length ? data.modifiers.join('-') : null,
        }
      }),
      invalidatesTags: ['SetData'],
    }),
    getSetData: builder.query({
      query: (exercise_data_id: string) => `/data/set/${exercise_data_id}`,
      providesTags: ['SetData'],
      transformResponse: (res: DB_Set[]) => res.map(d => ({
        ...d, 
        modifiers: d.modifiers?.split('-') || [],
      }))
    }),
    editSetData: builder.mutation({
      query: (data: SetFieldType) => ({
        url: `/data/set/${data.id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...data,
          modifiers: data.modifiers.length ? data.modifiers.join('-') : null,
        }
      }),
      invalidatesTags: ['SetData'],
    }),
    deleteSetData: builder.mutation({
      query: (id: string) => ({
        url: `/data/set/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SetData'],
    }),
  })
});

export const {
  useAddSetDataMutation,
  useGetSetDataQuery,
  useEditSetDataMutation,
  useDeleteSetDataMutation,
} = extendedApiSlice;
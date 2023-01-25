import { apiSlice } from "../../apiSlice";

interface DB_Scheduled {
  id: string,
  user_id: string,
  routine_id: string,
  day: string,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    setSchedule: builder.mutation({
      query: (schedule: DB_Scheduled) => ({
        url: '/user/scheduled/new',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          ...schedule,
          day: schedule.day.toLowerCase(),
        }
      }),
      invalidatesTags: ['Scheduled'],
    }),
    getScheduled: builder.query({
      query: (user_id: string) => `/user/scheduled/${user_id}`,
      providesTags: ['Scheduled'],
    }),
    deleteSchedule: builder.mutation({
      query: (id: string) => ({
        url: `/user/scheduled/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Scheduled'],
    }),
  })
});

export const {
  useGetScheduledQuery,
  useSetScheduleMutation,
  useDeleteScheduleMutation,
} = extendedApiSlice;
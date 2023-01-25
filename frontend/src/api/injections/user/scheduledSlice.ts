import { ScheduledRoutine } from "../../../types/scheduledState";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addSchedule: builder.mutation({
      query: (schedule: ScheduledRoutine) => ({
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
  useAddScheduleMutation,
  useDeleteScheduleMutation,
} = extendedApiSlice;
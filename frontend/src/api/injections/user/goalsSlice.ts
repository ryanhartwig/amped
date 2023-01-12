import { GoalType } from "../../../types/GoalType";
import { apiSlice } from "../../apiSlice";

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addNewGoal: builder.mutation({
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
    getGoals: builder.query({
      query: (user_id: string) => `/user/goals/${user_id}`,
      providesTags: ['Goals'],
    }),
    editGoal: builder.mutation({
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
    deleteGoal: builder.mutation({
      query: (id: string) => ({
        url: `/user/goals/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Goals'],
    }),
  })
});

export const {
  useAddNewGoalMutation,
  useGetGoalsQuery,
  useEditGoalMutation,
  useDeleteGoalMutation,
} = extendedApiSlice;
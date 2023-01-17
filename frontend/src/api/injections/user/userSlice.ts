import { apiSlice } from "../../apiSlice";

export interface DB_User {
  id: string,
  name: string,
  email: string,
  weekly_target: number,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: '/currentuser',
        credentials: 'include',
      }),
      // All requests will invalidate this query, thus every request will require the user to exist
      providesTags: [
        "ExerciseData", "Exercises", "Goals", "RoutineData", "Routines",
        "RtEx", "SetData", "User",
      ],
    }),
    getUserById: builder.query({
      query: (user_id: string) => `/user/${user_id}`,
      providesTags: ['User'],
    }),
    editUser: builder.mutation({
      query: ({id, patch}: {id: string, patch: Partial<DB_User>}) => ({
        url: `/user/${id}`,
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: patch
      }),
      invalidatesTags: ['User'],
    }),
  })
});

export const {
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
} = extendedApiSlice;
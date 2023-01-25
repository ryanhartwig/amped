import { apiSlice } from "../../apiSlice";

export interface DB_User {
  id: string,
  name: string,
  email: string,
  weekly_target: number,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    createNewUser: builder.mutation({
      query: ({id, name, email}: DB_User) => ({
        url: '/user/new',
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          id: id,
          name,
          email,
          weekly_target: 0,
        }
      })
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/currentuser',
        credentials: 'include',
      }),
      // All requests will invalidate this query, thus every request will require the user to exist
      providesTags: [
        "ExerciseData", "Exercises", "Goals", "RoutineData", "Routines",
        "RtEx", "SetData", "User", "Scheduled"
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
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      })
    }),
  })
});

export const {
  useCreateNewUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetCurrentUserQuery,
  useDeleteUserMutation,
} = extendedApiSlice;
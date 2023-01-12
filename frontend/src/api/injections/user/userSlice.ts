import { apiSlice } from "../../apiSlice";

export interface DB_User {
  id: string,
  name: string,
  email: string,
  weekly_target: string,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUser: builder.query({
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
  useGetUserQuery,
} = extendedApiSlice;
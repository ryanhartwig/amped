import { apiSlice } from "../../apiSlice";

interface SignIn {
  username: string,
  password: string,
}

interface Credentials {
  username: string,
  password: string,
  user_id: string,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signInLocal: builder.mutation({
      query: ({username, password}: SignIn) => ({
        url: '/login/local',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username,
          password
        }
      }),
      invalidatesTags: ['User'],
    }),
    addCredentials: builder.mutation({
      query: ({username, password, user_id}: Credentials) => ({
        url: '/credentials/new',
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          username,
          password,
          user_id,
        },
      })
    })
  })
});

export const {
  useSignInLocalMutation,
  useAddCredentialsMutation,
} = extendedApiSlice;
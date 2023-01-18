import { apiSlice } from "../../apiSlice";

interface Credentials {
  username: string,
  password: string,
}

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    signInLocal: builder.mutation({
      query: ({username, password}: Credentials) => ({
        url: '/login/local',
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        })
      }),
      invalidatesTags: ['User'],
    })
  })
});

export const {
  useSignInLocalMutation,

} = extendedApiSlice;
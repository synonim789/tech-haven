import { api } from '../../api/api'

type TokenType = {
  token: string
}

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenType, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    registerUser: builder.mutation({
      query: ({ email, name, password }) => ({
        url: '/users/sign-up',
        method: 'POST',
        body: { email, name, password },
      }),
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/users/forgot-password',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
} = authApiSlice

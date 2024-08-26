import { api } from '../../api/api'
import {
  ForgotPasswordValues,
  LoginValues,
  SignUpValues,
} from '../../validation/auth'

type TokenType = {
  token: string
}

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TokenType, LoginValues>({
      query: ({ email, password }) => ({
        url: '/users/login',
        method: 'POST',
        body: { email, password },
      }),
    }),
    registerUser: builder.mutation<TokenType, SignUpValues>({
      query: ({ email, name, password }) => ({
        url: '/users/sign-up',
        method: 'POST',
        body: { email, name, password },
      }),
    }),
    forgotPassword: builder.mutation<
      { success: boolean },
      ForgotPasswordValues
    >({
      query: ({ email }) => ({
        url: '/users/forgot-password',
        method: 'POST',
        body: { email: email },
      }),
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
} = authApiSlice

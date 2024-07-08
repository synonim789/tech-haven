import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

interface CustomError {
  data: {
    message: string
  }
}

const serverUrl = import.meta.env.VITE_SERVER_URL as string

const baseQuery = fetchBaseQuery({
  baseUrl: serverUrl,
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  },
}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Products', 'Categories', 'Users', 'User', 'FeaturedProducts'],
  endpoints: () => ({}),
})

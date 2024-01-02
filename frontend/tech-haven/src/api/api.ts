import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000/api/v1/',
  prepareHeaders(headers, { getState }) {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
  },
})

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Products', 'Categories', 'Users'],
  endpoints: () => ({}),
})

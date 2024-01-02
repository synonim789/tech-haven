import { api } from '../../api/api'

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ id }) => ({
        url: `users/${id}`,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PUT',
        body: body.data,
      }),
    }),
  }),
})

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } =
  userApiSlice

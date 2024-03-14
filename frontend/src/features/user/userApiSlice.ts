import { api } from '../../api/api'

export const userApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: ({ id }) => ({
        url: `users/${id}`,
      }),
      providesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (body) => ({
        url: `/users/${body.id}`,
        method: 'PUT',
        body: body.data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
})

export const { useGetUserQuery, useDeleteUserMutation, useUpdateUserMutation } =
  userApiSlice

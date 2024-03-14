import { api } from '../../api/api'
import { UserType } from '../../types'

const adminUserApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<UserType[], void>({
      query: () => ({
        url: '/users',
      }),
      providesTags: ['Users'],
    }),
    changeUserRole: builder.mutation({
      query: (id) => ({
        url: `/users/change-role/${id}`,
        method: 'PUT',
      }),
      invalidatesTags: ['Users'],
    }),
    adminDeleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
})

export const {
  useGetUsersQuery,
  useChangeUserRoleMutation,
  useAdminDeleteUserMutation,
} = adminUserApiSlice

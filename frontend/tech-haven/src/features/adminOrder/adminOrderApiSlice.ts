import { api } from '../../api/api'
import { OrderType } from '../../types'

const adminOrderApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<OrderType[], void>({
      query: () => '/orders',
    }),
  }),
})

export const { useGetAdminOrdersQuery } = adminOrderApiSlice

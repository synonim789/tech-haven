import { api } from '../../api/api'

const adminStatisticsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTotalSales: builder.query<{ totalSales: number }, void>({
      query: () => 'orders/get/TotalSales',
    }),
    getOrderCount: builder.query<{ count: number }, void>({
      query: () => 'orders/get/count',
    }),
    getUserCount: builder.query<{ count: number }, void>({
      query: () => 'users/get/count',
    }),
  }),
})

export const {
  useGetTotalSalesQuery,
  useGetOrderCountQuery,
  useGetUserCountQuery,
} = adminStatisticsApiSlice

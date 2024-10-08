import { api } from '../../api/api'

const adminStatisticsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getTotalSales: builder.query<{ totalSales: number }, void>({
      query: () => 'statistics/total-sales',
    }),
    getOrderCount: builder.query<{ count: number }, void>({
      query: () => 'statistics/order-count',
    }),
    getUserCount: builder.query<{ count: number }, void>({
      query: () => 'statistics/user-count',
    }),
    getSalesByDate: builder.query<{ _id: string; total: number }[], void>({
      query: () => 'statistics/sales-by-date',
    }),
    getSalesByCategory: builder.query<{ _id: string; categoryName: string; totalSales: number }[],void>({
      query: () => 'statistics/sales-by-category',
    }),
  }),
})

export const {
  useGetTotalSalesQuery,
  useGetOrderCountQuery,
  useGetUserCountQuery,
  useGetSalesByDateQuery,
  useGetSalesByCategoryQuery,
} = adminStatisticsApiSlice

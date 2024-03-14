import { api } from '../../api/api'
import { OrderType } from '../../types'

type EditOrder = {
  id: string
  status: string
}

const adminOrderApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOrders: builder.query<OrderType[], void>({
      query: () => '/orders',
    }),
    editOrder: builder.mutation<OrderType, EditOrder>({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PUT',
        body: { status },
      }),
    }),
  }),
})

export const { useGetAdminOrdersQuery, useEditOrderMutation } =
  adminOrderApiSlice

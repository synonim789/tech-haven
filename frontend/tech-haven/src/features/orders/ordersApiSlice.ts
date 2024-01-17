import { api } from '../../api/api'

type GetOrders = {
  total: number
  userOrders: OrderType[]
}

type OrderType = {
  _id: string
  orderItems: {}
  shippingAddress1: string
  shippingAddress2: string
  phone: string
  status: string
  total: number
  user: string
  subtotal: number
  dateOrdered: string
}

const ordersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (order) => ({
        url: 'orders/',
        method: 'POST',
        body: { order },
      }),
    }),
    getUserOrder: builder.query<
      GetOrders,
      { id: string | undefined; page: number }
    >({
      query: ({ id, page = 0 }) => ({
        url: `users/orders/${id}?page=${page}`,
      }),
    }),
  }),
})

export const { usePostOrderMutation, useGetUserOrderQuery } = ordersApiSlice

import { api } from '../../api/api'

type GetOrders = {
  total: number
  userOrders: OrderType[]
}

type OrderType = {
  _id: string
  orderItems: OrderItems[]
  shippingAddress1: string
  shippingAddress2: string
  phone: string
  status: string
  total: number
  user: string
  subtotal: number
  dateOrdered: string
}

type OrderItems = {
  name: string
  price: number
  quantity: number
  productId: {
    _id: string
    name: string
    image: string
    price: number
    id: string
  }
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
    getSingleOrder: builder.query<OrderType, string | undefined>({
      query: (id) => ({
        url: `orders/${id}`,
      }),
    }),
  }),
})

export const {
  usePostOrderMutation,
  useGetUserOrderQuery,
  useGetSingleOrderQuery,
} = ordersApiSlice

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

export type OrderItems = {
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

type PostOrder = {
  products: {
    quantity: number
    price: number
    name: string
    productId: string
  }[]
  userId: string | undefined
  shippingAddress1: string
  shippingAddress2: string
  phone: string
  total?: number
  subtotal?: number
}

const ordersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (order: PostOrder) => ({
        url: 'orders/',
        method: 'POST',
        body: {
          order,
        },
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
    postOrderStripe: builder.mutation({
      query: (order: PostOrder) => ({
        url: 'stripe/create-checkout-session',
        method: 'POST',
        body: { order },
      }),
    }),
  }),
})

export const {
  usePostOrderMutation,
  useGetUserOrderQuery,
  useGetSingleOrderQuery,
  usePostOrderStripeMutation,
} = ordersApiSlice

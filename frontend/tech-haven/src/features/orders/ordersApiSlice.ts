import { api } from '../../api/api'

const ordersApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    postOrder: builder.mutation({
      query: (order) => ({
        url: 'orders/',
        method: 'POST',
        body: { order },
      }),
    }),
  }),
})

export const { usePostOrderMutation } = ordersApiSlice

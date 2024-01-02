import { api } from '../../api/api'

const adminProductsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const { useAddProductMutation } = adminProductsApiSlice

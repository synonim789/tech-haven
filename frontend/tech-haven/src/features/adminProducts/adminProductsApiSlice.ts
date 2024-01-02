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
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    editProduct: builder.mutation({
      query: (body) => ({
        url: `/products/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useEditProductMutation,
} = adminProductsApiSlice

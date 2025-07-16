import { api } from '../../api/api'
import { ProductType } from '../../types'
import { EditProductValues } from '../../validation/product'

type AddProductType = {
  image: string
  images: string[]
  name: string
  description: string
  brand: string
  category: string
  price: number
  countInStock: number
  rating: number
  numReviews: number
  isFeatured?: boolean | undefined
}

const adminProductsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation<ProductType, AddProductType>({
      query: (body) => ({
        url: '/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<{ deleted: boolean }, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    editProduct: builder.mutation<
      ProductType,
      EditProductValues & { id: string }
    >({
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

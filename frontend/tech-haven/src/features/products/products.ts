import { api } from '../../api/api'
import { ProductType } from '../../types'

const productsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllProducts: build.query<ProductType[], void>({
      query: () => '/products/',
      providesTags: ['Products'],
    }),
    getSingleProduct: build.query<ProductType, void>({
      query: (id) => `/products/${id}`,
    }),
  }),
  overrideExisting: false,
})

export const { useGetAllProductsQuery, useGetSingleProductQuery } = productsApi

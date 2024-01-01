import { api } from '../../api/api'
import { ProductType } from '../../types'

const featuredProducts = api.injectEndpoints({
  endpoints: (build) => ({
    getFeaturedProducts: build.query<ProductType[], void>({
      query: () => '/products/get/featured-products',
    }),
  }),
  overrideExisting: false,
})

export const { useGetFeaturedProductsQuery } = featuredProducts

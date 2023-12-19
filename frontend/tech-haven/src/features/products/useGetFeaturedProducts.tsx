import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../../utils/customFetch'

const getFeaturedProducts = async () => {
  const { data } = await customFetch.get('/products/get/featured-products')
  return data
}

export const useGetFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: getFeaturedProducts,
  })
}

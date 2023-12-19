import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../../utils/customFetch'

const getSingleProduct = async (prodId: string) => {
  const { data } = await customFetch.get(`/products/${prodId}`)
  return data
}

export const useGetSingleProduct = (prodId: string) => {
  return useQuery({
    queryKey: ['product', prodId],
    queryFn: () => getSingleProduct(prodId),
  })
}

import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../../utils/customFetch'

const getAllProducts = async () => {
  const { data } = await customFetch('/products')
  return data
}

export const useGetAllProducts = () => {
  return useQuery({ queryKey: ['products'], queryFn: getAllProducts })
}

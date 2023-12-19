import { useQuery } from '@tanstack/react-query'
import { customFetch } from '../../utils/customFetch'

type getUser = {
  userId: string
  token: string
}

const getUser = async ({ userId, token }: getUser) => {
  const response = await customFetch(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data
}

export const useGetUser = ({ userId, token }: getUser) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUser({ userId, token }),
  })
}

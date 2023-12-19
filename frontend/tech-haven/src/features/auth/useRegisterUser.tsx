import { useMutation } from '@tanstack/react-query'
import Cookies from 'universal-cookie'
import { useAuthContext2 } from '../../context/AuthContext2'
import { customFetch } from '../../utils/customFetch'

const registerUser = async (user) => {
  const { email, name, password } = user
  const response = await customFetch.post(
    '/users/sign-up',
    { email, name, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return response.data.token
}

export const useRegisterUser = () => {
  const { loginUserInContext } = useAuthContext2()!
  const cookies = new Cookies()
  return useMutation({
    mutationFn: (user) => registerUser(user),
    onSuccess: (data) => {
      loginUserInContext(data)
      cookies.set('jwt', data)
    },
  })
}

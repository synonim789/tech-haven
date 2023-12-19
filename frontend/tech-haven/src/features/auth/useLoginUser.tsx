import { useMutation } from '@tanstack/react-query'
import { Cookies } from 'react-cookie'
import { useAuthContext2 } from '../../context/AuthContext2'
import { customFetch } from '../../utils/customFetch'

type userLoginType = {
  email: string
  password: string
}

const loginUser = async (user: userLoginType) => {
  const { email, password } = user
  const response = await customFetch.post(
    '/users/login',
    { email, password },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return response.data.token
}

export const useLoginUser = () => {
  const { loginUserInContext } = useAuthContext2()!
  const cookies = new Cookies()
  return useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: (data) => {
      loginUserInContext(data)
      cookies.set('jwt', data)
    },
  })
}

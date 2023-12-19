import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { customFetch } from '../../utils/customFetch'

const forgotPassword = async (user) => {
  const { email } = user
  const response = await customFetch.post(
    '/users/forget-password',
    { email },
    { headers: { 'Content-Type': 'application/json' } }
  )
  return response
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (user) => forgotPassword(user),
    onSuccess: () => {
      toast.success('Link to reset password was sent to your email')
    },
  })
}

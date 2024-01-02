import { Navigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FullscreenLoading from '../components/ui/FullscreenLoading'
import { useGetUserQuery } from '../features/user/userApiSlice'
import { RootState } from '../store'
import { ChildrenType } from '../types'
import { decodeToken } from '../utils/decodeToken'

const GuestRoute = ({ children }: ChildrenType) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState) => state.user.user)
  const [decodedToken, setDecodedToken] = useState('')
  useEffect(() => {
    if (token) {
      setDecodedToken(decodeToken(token))
    }
  }, [token])
  const { isLoading } = useGetUserQuery(
    { id: decodedToken?.userId },
    { skip: !token }
  )

  if (isLoading) {
    return <FullscreenLoading />
  }
  if (user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
export default GuestRoute

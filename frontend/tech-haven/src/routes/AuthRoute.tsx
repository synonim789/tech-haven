import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import FullscreenLoading from '../components/ui/FullscreenLoading'
import { useGetUserQuery } from '../features/user/userApiSlice'
import { RootState } from '../store'
import { ChildrenType } from '../types'
import { decodeToken } from '../utils/decodeToken'

const AuthRoute = ({ children }: ChildrenType) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState) => state.user.user)
  const decodedToken = decodeToken(token)

  const { isLoading, isError } = useGetUserQuery(
    {
      id: decodedToken?.userId,
    },
    {
      skip: !token,
    }
  )

  if (isLoading) {
    return <FullscreenLoading />
  }

  if (user) {
    return <>{children}</>
  }

  if (!token) {
    return <Navigate to="/" />
  }
}
export default AuthRoute

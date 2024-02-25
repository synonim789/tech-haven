import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../store'
import { ChildrenType } from '../types'

const AuthRoute = ({ children }: ChildrenType) => {
  const token = useSelector((state: RootState) => state.auth.token)
  const user = useSelector((state: RootState) => state.user.user)

  if (user) {
    return <>{children}</>
  }

  if (!token) {
    return <Navigate to="/" />
  }
}
export default AuthRoute

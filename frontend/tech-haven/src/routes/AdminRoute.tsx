import { Navigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext'
import { ChildrenType } from '../types'
import { decodeToken } from '../utils/decodeToken'

const AdminRoute = ({ children }: ChildrenType) => {
  const { token } = useAuthContext()!
  if (!token) {
    return <Navigate to="/" />
  }
  const decodedToken = decodeToken(token)
  const { role } = decodedToken

  if (role == 'admin') {
    return <>{children}</>
  }
  return <Navigate to="/" />
}

export default AdminRoute

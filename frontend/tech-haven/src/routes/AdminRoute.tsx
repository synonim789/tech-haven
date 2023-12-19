import { Navigate } from 'react-router'
import { useAuthContext2 } from '../context/AuthContext2'
import { ChildrenType } from '../types'
import { decodeToken } from '../utils/decodeToken'

const AdminRoute = ({ children }: ChildrenType) => {
  const { token } = useAuthContext2()!
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

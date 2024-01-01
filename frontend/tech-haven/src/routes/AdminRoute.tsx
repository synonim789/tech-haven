import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { RootState } from '../store'
import { ChildrenType } from '../types'
import { decodeToken } from '../utils/decodeToken'

const AdminRoute = ({ children }: ChildrenType) => {
  const token = useSelector((state: RootState) => state.auth.token)
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

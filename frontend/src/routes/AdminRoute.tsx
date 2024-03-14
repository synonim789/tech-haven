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

  if (decodedToken?.role !== 'admin') {
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default AdminRoute

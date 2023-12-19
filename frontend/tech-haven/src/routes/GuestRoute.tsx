import { Navigate } from 'react-router-dom'
import { useAuthContext2 } from '../context/AuthContext2'
import { ChildrenType } from '../types'

const GuestRoute = ({ children }: ChildrenType) => {
  const { token } = useAuthContext2()!

  if (token) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
export default GuestRoute

import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
import { ChildrenType } from '../types'

const GuestRoute = ({ children }: ChildrenType) => {
  const { user, userLoading } = useUserContext()!

  if (userLoading) {
    return <p>Loading...</p>
  }
  if (user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
export default GuestRoute

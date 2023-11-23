import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'

const GuestRoute = ({ children }) => {
  const { user, userLoading } = useUserContext()

  if (userLoading) {
    return <p>Loading...</p>
  }
  if (user) {
    return <Navigate to="/" />
  }

  return children
}
export default GuestRoute

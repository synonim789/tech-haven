import { Navigate } from 'react-router-dom'
import { useUserContext } from '../context/UserContext'
const AuthRoute = ({ children }) => {
  const { userLoading, user } = useUserContext()
  if (userLoading && !user) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/" />
  }
  if (user) {
    return children
  }
}
export default AuthRoute

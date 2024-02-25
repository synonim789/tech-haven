import { Navigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { RootState } from '../store'
import { ChildrenType } from '../types'

const GuestRoute = ({ children }: ChildrenType) => {
  const user = useSelector((state: RootState) => state.user.user)

  if (user) {
    return <Navigate to="/" />
  }

  return <>{children}</>
}
export default GuestRoute

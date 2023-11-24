import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiAdminLine } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useUserContext } from '../../context/UserContext'
import { decodeToken } from '../../utils/decodeToken'

import './Header.css'
const Header = () => {
  const [headerRole, setHeaderRole] = useState('')
  const location = useLocation()
  const { logoutUser, token } = useAuthContext()!
  const { user } = useUserContext()!
  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token)
      const { role } = decodedToken
      setHeaderRole(role)
    } else {
      setHeaderRole('')
    }
  }, [user])

  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/admin')
  ) {
    return null
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header__links">
          {headerRole === 'user' && (
            <div className="header__logged">
              <button className="header__logout" onClick={logoutUser}>
                Log out
              </button>
              <Link className="header__username" to={`/profile/`}>
                {user && user.name.split(' ')[0]}
                <CgProfile />
              </Link>
            </div>
          )}
          {headerRole === 'admin' && (
            <div className="header__logged">
              <button className="header__logout" onClick={logoutUser}>
                Log out
              </button>
              <Link to="/admin" className="header__admin">
                <RiAdminLine />
                <span>Admin Panel</span>
              </Link>
            </div>
          )}

          {!user && (
            <>
              <Link to="/login" className="header__link">
                Login
              </Link>
              <Link to="/sign-up" className="header__link">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
export default Header

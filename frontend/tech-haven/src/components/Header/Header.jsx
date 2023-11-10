import { CgProfile } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../../context/AuthContext'

import './Header.css'
const Header = () => {
  const location = useLocation()
  const { logoutUser } = useAuthContext()

  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password'
  ) {
    return null
  }

  return (
    <header className="header">
      <div className="header__links">
        <div className="header__logged">
          <button className="header__logout" onClick={logoutUser}>
            Log out
          </button>
          <Link className="header__username" to={`/profile/`}>
            <CgProfile />
          </Link>
        </div>

        <>
          <Link to="/login" className="header__link">
            Login
          </Link>
          <Link to="/sign-up" className="header__link">
            Sign Up
          </Link>
        </>
      </div>
    </header>
  )
}
export default Header

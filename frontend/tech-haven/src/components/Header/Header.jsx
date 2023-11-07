import { CgProfile } from 'react-icons/cg'
import { Link, useLocation } from 'react-router-dom'
import { useUserContext } from '../../context/UserContext'
import './Header.css'
const Header = () => {
  const { user, logoutUser } = useUserContext()
  const location = useLocation()

  if (
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/forgot-password'
  ) {
    return null
  }

  return (
    <header className="header">
      <div className="header__links">
        {user && (
          <div className="header__logged">
            <button onClick={logoutUser} className="header__logout">
              Log out
            </button>
            <p className="header__username">
              {user.user}
              <CgProfile />
            </p>
          </div>
        )}
        {!user && (
          <>
            <Link to="/login" className="header__link">
              Login
            </Link>
            <Link to="/register" className="header__link">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  )
}
export default Header

import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const location = useLocation()

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }

  return (
    <header className="header">
      <div className="header__links">
        <Link to="/login" className="header__link">
          Login
        </Link>
        <Link to="/register" className="header__link">
          Register
        </Link>
      </div>
    </header>
  )
}
export default Header

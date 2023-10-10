import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation()
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }

  return (
    <header className="header">
      <h1>header</h1>
    </header>
  )
}
export default Header

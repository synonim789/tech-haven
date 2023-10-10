import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }
  return <section className="navbar">Navbar</section>
}
export default Navbar

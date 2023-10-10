import { useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }
  return (
    <section className="navbar">
      <h1 className="navbar__title">TechHaven</h1>
    </section>
  )
}
export default Navbar

import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'
import { GrCart } from 'react-icons/gr'

const Navbar = () => {
  const location = useLocation()
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null
  }
  return (
    <section className="navbar">
      <p className="navbar__title">
        <Link to="/">TechHaven</Link>
      </p>
      <nav className="navbar__navigation">
        <ul className="navbar__link">
          <Link to="/products">Products</Link>
        </ul>
        <ul className="navbar__link">
          <Link to="/about">About Us</Link>
        </ul>
        <ul className="navbar__link">
          <Link to="/contact">Contact</Link>
        </ul>
        <ul className="navbar__link">
          <Link to="/cart">
            <GrCart />
            Cart
          </Link>
        </ul>
      </nav>
    </section>
  )
}
export default Navbar

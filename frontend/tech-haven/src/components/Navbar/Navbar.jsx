import { Link, NavLink, useLocation } from 'react-router-dom'
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
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? 'pending' : isActive ? 'active' : ''
          }
        >
          TechHaven
        </NavLink>
      </p>
      <nav className="navbar__navigation">
        <ul className="navbar__link">
          <NavLink
            to="/products"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            Products
          </NavLink>
        </ul>
        <ul className="navbar__link">
          <NavLink
            to="/about"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            About Us
          </NavLink>
        </ul>
        <ul className="navbar__link">
          <NavLink
            to="/contact"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            Contact
          </NavLink>
        </ul>
        <ul className="navbar__link">
          <NavLink
            to="/cart"
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            <GrCart />
            Cart
          </NavLink>
        </ul>
      </nav>
    </section>
  )
}
export default Navbar

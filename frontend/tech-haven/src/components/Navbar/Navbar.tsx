import { GrCart } from 'react-icons/gr'
import { NavLink, useLocation } from 'react-router-dom'
import { useCartContext } from '../../context/cart_context'
import './Navbar.css'

const Navbar = () => {
  const location = useLocation()
  const { total_items } = useCartContext()!
  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password'
  ) {
    return null
  }

  return (
    <section className="navbar">
      <div className="container">
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
                isPending
                  ? 'pending navbar__cart-items'
                  : isActive
                  ? 'none navbar__cart-items'
                  : 'navbar__cart-items'
              }
            >
              <GrCart />
              {total_items > 0 ? (
                <p className="navbar__cart-amount">{total_items}</p>
              ) : null}
            </NavLink>
          </ul>
        </nav>
      </div>
    </section>
  )
}
export default Navbar

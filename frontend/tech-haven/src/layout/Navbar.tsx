import { GrCart } from 'react-icons/gr'
import { NavLink, useLocation } from 'react-router-dom'
import { useCartContext } from '../context/cart_context'

const Navbar = () => {
  const location = useLocation()
  const { total_items } = useCartContext()!
  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/admin')
  ) {
    return null
  }

  return (
    <section className="py-5 bg-white w-full sticky top-0 z-20">
      <div className="flex justify-between items-center max-w-5xl mx-auto px-4">
        <p className="font-bold text-3xl text-[#120b90] relative">
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              isPending
                ? ''
                : isActive
                ? "after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:left-0 after:right-0 after:mx-auto after:absolute after:-bottom-2"
                : ''
            }
          >
            TechHaven
          </NavLink>
        </p>
        <nav className=" gap-4 items-center hidden sm:flex">
          <ul className="text-2xl font-semibold relative">
            <NavLink
              to="/products"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending'
                  : isActive
                  ? "after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:left-0 after:right-0 after:mx-auto after:absolute after:-bottom-2"
                  : ''
              }
            >
              Products
            </NavLink>
          </ul>
          <ul className="text-2xl font-semibold relative">
            <NavLink
              to="/about"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending'
                  : isActive
                  ? "after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:left-0 after:right-0 after:mx-auto after:absolute after:-bottom-2"
                  : ''
              }
            >
              About Us
            </NavLink>
          </ul>
          <ul className="text-2xl font-semibold relative">
            <NavLink
              to="/contact"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending'
                  : isActive
                  ? "after:content-[''] after:bg-orange-500 after:h-1 after:w-4/5 after:left-0 after:right-0 after:mx-auto after:absolute after:-bottom-2"
                  : ''
              }
            >
              Contact
            </NavLink>
          </ul>
          <ul className="text-2xl font-semibold">
            <NavLink
              to="/cart"
              className={({ isActive, isPending }) =>
                isPending
                  ? 'pending relative'
                  : isActive
                  ? 'none relative'
                  : 'relative'
              }
            >
              <GrCart />
              {total_items > 0 ? (
                <p className="w-6 h-6 rounded-full bg-orange-500 text-white text-xl flex justify-center items-start absolute top-[-14px] right-[-14px]">
                  {total_items}
                </p>
              ) : null}
            </NavLink>
          </ul>
        </nav>
      </div>
    </section>
  )
}
export default Navbar

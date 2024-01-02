import { useState } from 'react'
import { GrCart } from 'react-icons/gr'
import { IoMdClose } from 'react-icons/io'

import { RxHamburgerMenu } from 'react-icons/rx'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'
import { RootState } from '../store'

const Navbar = () => {
  const location = useLocation()
  const totalItems = useSelector((state: RootState) => state.cart.totalItems)
  const [showNavigation, setShowNavigation] = useState(false)
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
      <div className="flex justify-between items-center max-w-5xl mx-auto px-5">
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
        <nav>
          <ul className=" gap-4 items-center hidden sm:flex">
            <li className="text-2xl font-semibold relative">
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
            </li>
            <li className="text-2xl font-semibold relative">
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
            </li>
            <li className="text-2xl font-semibold relative">
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
            </li>
            <li className="text-2xl font-semibold">
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
                {totalItems > 0 ? (
                  <p className="w-6 h-6 rounded-full bg-orange-500 text-white text-xl flex justify-center items-start absolute top-[-14px] right-[-14px]">
                    {totalItems}
                  </p>
                ) : null}
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className="flex sm:hidden">
          <RxHamburgerMenu
            className="text-4xl font-bold cursor-pointer"
            onClick={() => setShowNavigation(!showNavigation)}
          />
          {showNavigation && (
            <nav className="flex flex-col items-start justify-start fixed top-0 right-0  w-4/6 h-screen bg-white transition text-4xl">
              <IoMdClose
                className="cursor-pointer my-5 ml-4 text-6xl"
                onClick={() => setShowNavigation(false)}
              />

              <ul className="ml-4 flex gap-5 flex-col">
                <li className="mt-5">
                  <NavLink
                    to="/products"
                    onClick={() => setShowNavigation(false)}
                    className={({ isActive }) =>
                      isActive ? 'font-semibold' : ''
                    }
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    onClick={() => setShowNavigation(false)}
                    className={({ isActive }) =>
                      isActive ? 'font-semibold' : ''
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    onClick={() => setShowNavigation(false)}
                    className={({ isActive }) =>
                      isActive ? 'font-semibold' : ''
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
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
                    {totalItems > 0 ? (
                      <p className="w-6 h-6 rounded-full bg-orange-500 text-white text-xl flex justify-center items-start absolute top-[-14px] left-6">
                        {totalItems}
                      </p>
                    ) : null}
                  </NavLink>
                </li>
              </ul>
            </nav>
          )}
        </nav>
      </div>
    </section>
  )
}
export default Navbar

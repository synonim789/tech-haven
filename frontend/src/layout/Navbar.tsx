import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BsFillCartFill } from 'react-icons/bs'

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
    <section className="sticky top-0 z-20 w-full bg-white py-5 dark:bg-[#121212] dark:text-slate-400">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-4">
        <p className="relative text-3xl font-bold text-[#405684]">
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
          <ul className=" hidden items-center gap-4 sm:flex">
            <li className="relative text-2xl font-semibold">
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
            <li className="relative text-2xl font-semibold">
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
            <li className="relative text-2xl font-semibold">
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
                <BsFillCartFill />
                {totalItems > 0 ? (
                  <p className="absolute right-[-14px] top-[-14px] flex size-6 items-start justify-center rounded-full bg-orange-500 text-xl text-white">
                    {totalItems}
                  </p>
                ) : null}
              </NavLink>
            </li>
          </ul>
        </nav>
        <nav className="flex sm:hidden">
          <RxHamburgerMenu
            className="cursor-pointer text-4xl font-bold"
            onClick={() => setShowNavigation(!showNavigation)}
          />
          <AnimatePresence mode="wait">
            {showNavigation && (
              <motion.nav
                initial={{ x: '100%' }}
                animate={{ x: '0%' }}
                exit={{ x: '100%' }}
                transition={{
                  duration: 0.5,
                  ease: 'easeInOut',
                }}
                className="fixed right-0 top-0 flex h-screen w-4/6 flex-col  items-start justify-start bg-white text-4xl dark:bg-[#3f3f3f]"
              >
                <nav>
                  <IoMdClose
                    className="my-5 ml-4 cursor-pointer text-6xl"
                    onClick={() => setShowNavigation(false)}
                  />

                  <ul className="ml-4 flex flex-col gap-5">
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
                        onClick={() => setShowNavigation(false)}
                      >
                        <BsFillCartFill />
                        {totalItems > 0 ? (
                          <p className="absolute left-6 top-[-14px] flex size-6 items-start justify-center rounded-full bg-orange-500 text-xl text-white">
                            {totalItems}
                          </p>
                        ) : null}
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </motion.nav>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </section>
  )
}
export default Navbar

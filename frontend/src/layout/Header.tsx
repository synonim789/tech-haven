import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiAdminLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../features/auth/authSlice'
import { setUser } from '../features/user/userSlice'
import { RootState } from '../store'
import { decodeToken } from '../utils/decodeToken'

const Header = () => {
  const [headerRole, setHeaderRole] = useState('')
  const location = useLocation()
  const token = useSelector((state: RootState) => state.auth.token)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  useEffect(() => {
    if (token) {
      const decodedToken = decodeToken(token)
      if (decodedToken) {
        const { role } = decodedToken
        setHeaderRole(role)
      }
    } else {
      setHeaderRole('')
    }
  }, [user])

  if (
    location.pathname === '/login' ||
    location.pathname === '/sign-up' ||
    location.pathname === '/forgot-password' ||
    location.pathname.startsWith('/admin')
  ) {
    return null
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(setUser(null))
  }

  return (
    <header className="relative w-full bg-[#405684] py-3">
      <div className="mx-auto max-w-screen-xl px-4">
        {headerRole === 'user' && (
          <div className="flex items-center justify-center gap-5 sm:justify-end">
            <button
              className="rounded-lg border-2 border-solid border-white px-2 py-1 text-xl font-bold text-white hover:opacity-90 dark:text-slate-300"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
            <Link
              className="flex items-center gap-2 text-xl font-bold text-white underline"
              to={`/profile/`}
            >
              {user && user.name.split(' ')[0]}
              <CgProfile className="size-8" />
            </Link>
          </div>
        )}
        {headerRole === 'admin' && (
          <div className="flex items-center justify-center gap-5 sm:justify-end">
            <button
              className="rounded-lg border-2 border-solid border-white px-2 py-1 text-xl font-bold text-white hover:opacity-90 dark:text-slate-300"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
            <Link
              to="/admin"
              className="flex items-center gap-2 text-xl font-bold text-white hover:opacity-90 dark:text-slate-300"
            >
              <RiAdminLine className="size-8" />
              <span>Admin Panel</span>
            </Link>
          </div>
        )}

        {!user && (
          <div className="flex justify-center gap-3 sm:justify-end">
            <Link
              to="/login"
              className="text-2xl font-bold text-white transition-opacity hover:opacity-60 dark:text-slate-300"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-2xl font-bold text-white transition-opacity hover:opacity-60 dark:text-slate-300"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header

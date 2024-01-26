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
      const { role } = decodedToken
      setHeaderRole(role)
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
    <header className="bg-[#405684] w-full py-3 relative ">
      <div className="max-w-screen-xl px-4 mx-auto">
        {headerRole === 'user' && (
          <div className="flex justify-center sm:justify-end items-center gap-5">
            <button
              className="border-[2px] border-solid border-white text-white dark:text-slate-300 text-xl font-bold px-2 py-1 rounded-lg hover:opacity-90"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
            <Link
              className="text-white font-bold underline flex items-center text-xl gap-2"
              to={`/profile/`}
            >
              {user && user.name.split(' ')[0]}
              <CgProfile className="h-8 w-8" />
            </Link>
          </div>
        )}
        {headerRole === 'admin' && (
          <div className="flex justify-center sm:justify-end items-center gap-5">
            <button
              className="border-[2px] border-solid border-white text-white dark:text-slate-300 text-xl font-bold px-2 py-1 rounded-lg hover:opacity-90"
              onClick={() => handleLogout()}
            >
              Log out
            </button>
            <Link
              to="/admin"
              className="text-white dark:text-slate-300 font-bold text-xl flex items-center gap-2 hover:opacity-90"
            >
              <RiAdminLine className="h-8 w-8" />
              <span>Admin Panel</span>
            </Link>
          </div>
        )}

        {!user && (
          <div className="flex justify-center sm:justify-end gap-3">
            <Link
              to="/login"
              className="text-white dark:text-slate-300 text-2xl font-bold transition-opacity hover:opacity-60"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-white dark:text-slate-300 text-2xl font-bold transition-opacity hover:opacity-60"
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

import { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { RiAdminLine } from 'react-icons/ri'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'
import { useUserContext } from '../context/UserContext'
import { decodeToken } from '../utils/decodeToken'

const Header = () => {
  const [headerRole, setHeaderRole] = useState('')
  const location = useLocation()
  const { logoutUser, token } = useAuthContext()!
  const { user } = useUserContext()!
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

  return (
    <header className="bg-[#120b90] w-full py-3 relative text-right">
      <div className="max-w-5xl mx-auto">
        {headerRole === 'user' && (
          <div className="flex justify-end items-center gap-5">
            <button
              className="border-[2px] border-solid border-white text-white text-xl font-bold px-2 py-1 rounded-lg hover:opacity-90"
              onClick={logoutUser}
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
          <div className="flex justify-end items-center gap-5">
            <button
              className="border-[2px] border-solid border-white text-white text-xl font-bold px-2 py-1 rounded-lg hover:opacity-90"
              onClick={logoutUser}
            >
              Log out
            </button>
            <Link
              to="/admin"
              className="text-white font-bold text-xl flex items-center gap-2 hover:opacity-90"
            >
              <RiAdminLine className="h-8 w-8" />
              <span>Admin Panel</span>
            </Link>
          </div>
        )}

        {!user && (
          <div className="flex justify-end gap-3">
            <Link
              to="/login"
              className="text-white text-2xl font-bold transition-opacity hover:opacity-60"
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="text-white text-2xl font-bold transition-opacity hover:opacity-60"
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

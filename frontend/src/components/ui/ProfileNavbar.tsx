import { FaHistory, FaInfoCircle } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

const ProfileNavbar = () => {
  return (
    <aside className="mb-6 flex items-center justify-between rounded-full bg-white p-4 text-slate-500 shadow-xl dark:bg-[#121212]">
      <NavLink
        to="info"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center px-8 py-4 text-3xl font-semibold gap-3 bg-[#405684] text-white rounded-full'
            : 'flex items-center px-8 py-4 text-3xl font-semibold gap-3'
        }
      >
        <FaInfoCircle />
        <span className="hidden md:block">Info</span>
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center px-8 py-4  text-3xl font-semibold gap-3 bg-[#405684] text-white rounded-full'
            : 'flex items-center px-8 py-4  text-3xl font-semibold gap-3'
        }
      >
        <FaHistory />
        <span className="hidden md:block">Orders</span>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center px-8 py-4 text-3xl font-semibold gap-3 bg-[#405684] text-white rounded-full'
            : 'flex items-center px-8 py-4 text-3xl font-semibold gap-3'
        }
      >
        <IoSettingsSharp />
        <span className="hidden md:block">Settings</span>
      </NavLink>
    </aside>
  )
}
export default ProfileNavbar

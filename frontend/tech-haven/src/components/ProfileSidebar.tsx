import { FaHistory, FaInfoCircle } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'

const ProfileSidebar = () => {
  return (
    <aside className="flex p-4 bg-white shadow-xl rounded-full mb-6 items-center">
      <NavLink
        to="info"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center px-8 py-4 text-3xl font-semibold gap-3 bg-[#120b90] text-white rounded-full'
            : 'flex items-center px-8 py-4 text-3xl font-semibold gap-3'
        }
      >
        <FaInfoCircle />
        <span>Info</span>
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center px-8 py-4  text-3xl font-semibold gap-3 bg-[#120b90] text-white rounded-full'
            : 'flex items-center px-8 py-4  text-3xl font-semibold gap-3'
        }
      >
        <FaHistory />
        <span>Orders</span>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          isActive
            ? 'flex items-center px-8 py-4 text-3xl font-semibold gap-3 bg-[#120b90] text-white rounded-full'
            : 'flex items-center px-8 py-4 text-3xl font-semibold gap-3'
        }
      >
        <IoSettingsSharp />
        <span>Settings</span>
      </NavLink>
    </aside>
  )
}
export default ProfileSidebar

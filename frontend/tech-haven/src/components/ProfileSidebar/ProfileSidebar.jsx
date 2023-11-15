import { FaHistory, FaInfoCircle } from 'react-icons/fa'
import { IoSettingsSharp } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import './ProfileSidebar.css'
const ProfileSidebar = () => {
  return (
    <aside className="profile-sidebar">
      <NavLink
        to="info"
        className={({ isActive }) =>
          isActive ? 'profile__link profile__link--active' : 'profile__link'
        }
      >
        <FaInfoCircle />
        <span>Info</span>
      </NavLink>
      <NavLink
        to="orders"
        className={({ isActive }) =>
          isActive ? 'profile__link profile__link--active' : 'profile__link'
        }
      >
        <FaHistory />
        <span>Orders</span>
      </NavLink>
      <NavLink
        to="settings"
        className={({ isActive }) =>
          isActive ? 'profile__link profile__link--active' : 'profile__link'
        }
      >
        <IoSettingsSharp />
        <span>Settings</span>
      </NavLink>
    </aside>
  )
}
export default ProfileSidebar

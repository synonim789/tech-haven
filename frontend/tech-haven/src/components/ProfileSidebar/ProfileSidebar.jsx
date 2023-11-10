import { Link } from 'react-router-dom'
import './ProfileSidebar.css'

const ProfileSidebar = () => {
  return (
    <aside className="profile-sidebar">
      <Link to="info">Info</Link>
      <Link to="orders">Orders</Link>
      <Link to="settings">Settings</Link>
    </aside>
  )
}
export default ProfileSidebar

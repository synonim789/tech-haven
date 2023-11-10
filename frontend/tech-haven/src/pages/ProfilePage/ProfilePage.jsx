import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar'
import './ProfilePage.css'

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <ProfileSidebar />

      <Outlet />
    </div>
  )
}
export default ProfilePage

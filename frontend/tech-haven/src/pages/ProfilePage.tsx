import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../components/ProfileSidebar'

const ProfilePage = () => {
  return (
    <div className="max-w-5xl mx-auto flex flex-col justify-between my-5 text-center">
      <ProfileSidebar />

      <Outlet />
    </div>
  )
}
export default ProfilePage

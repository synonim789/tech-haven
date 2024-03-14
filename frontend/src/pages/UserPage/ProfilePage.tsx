import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../../components/ui/ProfileNavbar'

const ProfilePage = () => {
  return (
    <div className="mx-auto py-4">
      <ProfileSidebar />
      <Outlet />
    </div>
  )
}
export default ProfilePage

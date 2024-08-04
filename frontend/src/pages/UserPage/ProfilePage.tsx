import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../../components/ui/ProfileNavbar'

const ProfilePage = () => {
  return (
    <div className="py-4 flex items-center flex-col mx-auto">
      <ProfileSidebar />
      <Outlet />
    </div>
  )
}
export default ProfilePage

import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar'
import { useUserContext } from '../../context/UserContext'
import './ProfilePage.css'

const ProfilePage = () => {
  const { userLoading } = useUserContext()!
  if (userLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="profile-page">
      <ProfileSidebar />

      <Outlet />
    </div>
  )
}
export default ProfilePage

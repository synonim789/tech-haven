import { Outlet } from 'react-router-dom'
import ProfileSidebar from '../components/ProfileSidebar/ProfileSidebar'
import { useUserContext } from '../context/UserContext'

const ProfilePage = () => {
  const { userLoading } = useUserContext()!
  if (userLoading) {
    return <p>Loading...</p>
  }
  return (
    <div className="max-w-5xl mx-auto flex flex-col justify-between my-5 text-center">
      <ProfileSidebar />

      <Outlet />
    </div>
  )
}
export default ProfilePage

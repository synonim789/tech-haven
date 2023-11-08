import { useUserContext } from '../../context/UserContext'

const ProfilePage = () => {
  const { user } = useUserContext()
  const { id } = user
  return <div>Welcome, {user.name.split(' ')[0]}</div>
}
export default ProfilePage

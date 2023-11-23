import { useUserContext } from '../../context/UserContext'
import './UserWelcomePage.css'
const UserWelcomePage = () => {
  const { user } = useUserContext()!
  return (
    <main className="profile-welcome">
      <h1>Welcome, {user.name}</h1>
    </main>
  )
}
export default UserWelcomePage

import { useUserContext } from '../../context/UserContext'

const UserWelcomePage = () => {
  const { user } = useUserContext()!
  return (
    <main>
      <h1 className="text-3xl font-semibold">Welcome, {user.name}</h1>
    </main>
  )
}
export default UserWelcomePage

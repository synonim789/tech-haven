import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const UserWelcomePage = () => {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <main>
      <h1 className="text-3xl font-semibold">Welcome, {user?.name}</h1>
    </main>
  )
}
export default UserWelcomePage

import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const UserWelcomePage = () => {
  const user = useSelector((state: RootState) => state.user.user)
  return (
    <main className="flex items-center">
      <h2 className="text-3xl font-semibold text-slate-500 text-center">
        Welcome, {user?.name}
      </h2>
    </main>
  )
}
export default UserWelcomePage

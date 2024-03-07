import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import AdminWelcomeStatistics from './AdminWelcomeStatistics'

const AdminWelcomePage = () => {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <div className="space-y-5 w-full">
      <div className="text-2xl text-slate-500 text-right bg-[#222427] px-10 py-5 rounded-2xl shadow-xl">
        <span className="">Welcome, </span>
        <Link
          to={`/profile`}
          className="font-bold underline-offset-3 underline"
        >
          {user?.name}
        </Link>
      </div>
      <AdminWelcomeStatistics />
    </div>
  )
}
export default AdminWelcomePage

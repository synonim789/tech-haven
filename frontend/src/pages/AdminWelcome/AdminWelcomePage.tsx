import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import AdminSalesByCategory from './AdminSalesByCategory'
import AdminSalesByDate from './AdminSalesByDate'
import AdminWelcomeStatisticsCards from './AdminWelcomeStatisticsCards'

const AdminWelcomePage = () => {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <section className="space-y-5 w-full">
      <div className="text-2xl text-slate-500 text-right bg-white dark:bg-[#222427] px-10 py-5 rounded-2xl shadow-xl">
        <span className="">Welcome, </span>
        <Link
          to={`/profile`}
          className="font-bold underline-offset-3 underline"
        >
          {user?.name}
        </Link>
      </div>
      <AdminWelcomeStatisticsCards />
      <section className="flex flex-col gap-5 lg:flex-row">
        <AdminSalesByDate />
        <AdminSalesByCategory />
      </section>
    </section>
  )
}
export default AdminWelcomePage

import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import AdminSalesByCategory from './AdminSalesByCategory'
import AdminSalesByDate from './AdminSalesByDate'
import AdminWelcomeStatisticsCards from './AdminWelcomeStatisticsCards'

const AdminWelcomePage = () => {
  const user = useSelector((state: RootState) => state.user.user)

  return (
    <section className="w-full space-y-5">
      <div className="rounded-2xl bg-white px-10 py-5 text-right text-2xl text-slate-500 shadow-xl dark:bg-[#222427]">
        <span className="">Welcome, </span>
        <Link
          to={`/profile`}
          className="underline-offset-3 font-bold underline"
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

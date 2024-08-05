import { Outlet } from 'react-router'
import AdminSidebar from '../../layout/AdminSidebar'

const AdminPage = () => {
  return (
    <section className="w-full lg:flex lg:flex-row">
      <AdminSidebar />
      <div className="mt-8 flex w-full justify-center py-6 md:mx-auto md:px-4">
        <Outlet />
      </div>
    </section>
  )
}
export default AdminPage

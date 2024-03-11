import { Outlet } from 'react-router'
import AdminSidebar from '../../layout/AdminSidebar'

const AdminPage = () => {
  return (
    <section className="lg:flex lg:flex-row w-full">
      <AdminSidebar />
      <div className="flex justify-center mt-8 mx-auto px-4 py-6">
        <Outlet />
      </div>
    </section>
  )
}
export default AdminPage

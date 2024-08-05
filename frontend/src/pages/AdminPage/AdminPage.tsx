import { Outlet } from 'react-router'
import AdminSidebar from '../../layout/AdminSidebar'

const AdminPage = () => {
  return (
    <section className="lg:flex lg:flex-row w-full">
      <AdminSidebar />
      <div className="flex justify-center mt-8 md:mx-auto md:px-4 py-6 w-full">
        <Outlet />
      </div>
    </section>
  )
}
export default AdminPage

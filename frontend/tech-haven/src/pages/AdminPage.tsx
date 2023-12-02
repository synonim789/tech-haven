import { Outlet } from 'react-router'
import AdminSidebar from '../components/AdminSidebar'

const AdminPage = () => {
  return (
    <>
      <AdminSidebar />
      <main className="flex justify-center items-center mt-8">
        <Outlet />
      </main>
    </>
  )
}
export default AdminPage

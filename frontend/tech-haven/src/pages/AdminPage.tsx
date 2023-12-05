import { Outlet } from 'react-router'
import AdminSidebar from '../components/AdminSidebar'

const AdminPage = () => {
  return (
    <>
      <AdminSidebar />
      <main className="flex justify-center items-center mt-8 max-w-5xl mx-auto px-4">
        <Outlet />
      </main>
    </>
  )
}
export default AdminPage

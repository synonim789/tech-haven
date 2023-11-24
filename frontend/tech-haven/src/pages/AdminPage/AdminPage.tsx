import { Outlet } from 'react-router'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import './AdminPage.css'

const AdminPage = () => {
  return (
    <>
      <AdminSidebar />
      <main className="admin-page__main">
        <Outlet />
      </main>
    </>
  )
}
export default AdminPage

import { Outlet } from 'react-router'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import './AdminPage.css'

const AdminPage = () => {
  return (
    <>
      <AdminSidebar />
      <Outlet />
    </>
  )
}
export default AdminPage

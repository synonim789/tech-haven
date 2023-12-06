import { useEffect } from 'react'
import { Outlet } from 'react-router'
import AdminSidebar from '../components/AdminSidebar'
import { useAdminContext } from '../context/AdminContext'

const AdminPage = () => {
  const { getCategories, addCategorySuccess } = useAdminContext()!
  useEffect(() => {
    getCategories()
  }, [addCategorySuccess])
  return (
    <>
      <AdminSidebar />
      <main className="flex justify-center flex-col items-center mt-8 max-w-5xl mx-auto px-4 py-6  ">
        <Outlet />
      </main>
    </>
  )
}
export default AdminPage

import { useEffect } from 'react'
import { Outlet } from 'react-router'
import { useAdminContext } from '../../context/AdminContext'
import AdminSidebar from '../../layout/AdminSidebar'

const AdminPage = () => {
  const { getCategories, addCategorySuccess, deleteCategorySuccess } =
    useAdminContext()!
  useEffect(() => {
    getCategories()
  }, [addCategorySuccess, deleteCategorySuccess])
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

import { useEffect } from 'react'
import { useAdminContext } from '../../context/AdminContext'
import { CategoryType } from '../../types'
import EditCategory from './EditCategory'

const EditCategoryPage = () => {
  const { categories, editCategorySuccess, getCategories } = useAdminContext()!
  useEffect(() => {
    getCategories()
  }, [editCategorySuccess])
  return (
    <section>
      <h4 className="text-4xl font-semibold text-center mb-8">Edit Category</h4>
      {categories.map((category: CategoryType) => {
        return (
          <EditCategory
            id={category._id}
            name={category.name}
            key={category._id}
          />
        )
      })}
    </section>
  )
}
export default EditCategoryPage

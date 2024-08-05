import { useGetCategoriesQuery } from '../../features/adminCategories/categoriesApiSlice'
import { CategoryType } from '../../types'
import EditCategory from './EditCategory'

const EditCategoryPage = () => {
  const { data: categories } = useGetCategoriesQuery()

  return (
    <section>
      <h4 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Edit Category
      </h4>
      {categories?.map((category: CategoryType) => {
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

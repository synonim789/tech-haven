import { BiSolidTrash } from 'react-icons/bi'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from '../../features/adminCategories/categoriesApiSlice'
import { CategoryType } from '../../types'

const RemoveCategoryPage = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery()
  const [deleteCategory, { error: deleteCategoryError }] =
    useDeleteCategoryMutation()

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <h4 className="text-4xl font-semibold">Remove Category</h4>
      {categories?.map((category: CategoryType) => {
        return (
          <div
            className="bg-white w-full p-4 shadow-lg rounded-lg flex justify-between items-center"
            key={category._id}
          >
            <p className="text-3xl font-bold">{category.name}</p>
            <BiSolidTrash
              className="text-3xl cursor-pointer hover:opacity-75 text-red-600 hover:scale-110 transition"
              onClick={() => {
                deleteCategory(category._id)
              }}
            />
          </div>
        )
      })}
      {deleteCategoryError && (
        <p className="font-bold text-red-600">
          {deleteCategoryError.data.message}
        </p>
      )}
    </section>
  )
}
export default RemoveCategoryPage

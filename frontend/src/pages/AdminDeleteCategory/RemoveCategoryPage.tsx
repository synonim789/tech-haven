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
    <section className="flex flex-col gap-6">
      <h4 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Remove Category
      </h4>
      {categories?.map((category: CategoryType) => {
        return (
          <div
            className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-lg dark:bg-[#222427]"
            key={category._id}
          >
            <p className="text-3xl font-bold dark:text-slate-600">
              {category.name}
            </p>
            <BiSolidTrash
              className="cursor-pointer text-3xl text-red-500 transition hover:scale-110 hover:opacity-75"
              onClick={() => {
                deleteCategory(category._id)
              }}
            />
          </div>
        )
      })}
      {deleteCategoryError && (
        <p className="font-bold text-red-500">
          {'data' in deleteCategoryError ? (
            <>{deleteCategoryError.data.message}</>
          ) : (
            ''
          )}
        </p>
      )}
    </section>
  )
}
export default RemoveCategoryPage

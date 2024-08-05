import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useAddCategoryMutation } from '../../features/adminCategories/categoriesApiSlice'

const AddCategory = () => {
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      category: '',
    },
  })
  const [addCategory, { isLoading, isSuccess }] = useAddCategoryMutation()

  useEffect(() => {
    if (isSuccess) {
      reset()
      toast.success('Category added successfully')
    }
  }, [isSuccess])

  const { errors } = formState

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="flex flex-col items-center gap-4">
      <h4 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Add Category
      </h4>
      <form
        className="flex flex-col items-center gap-4"
        onSubmit={handleSubmit(addCategory)}
      >
        <FormInput
          name="category"
          type="text"
          register={{
            ...register('category', { required: 'Category is required' }),
          }}
          error={errors.category?.message}
        />
        <FormButton text="Add Category" loading={false} />
      </form>
    </section>
  )
}
export default AddCategory

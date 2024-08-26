import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import FormButton from '../../components/form/FormButton'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useAddCategoryMutation } from '../../features/adminCategories/categoriesApiSlice'
import { addCategorySchema, AddCategoryValues } from '../../validation/category'

const AddCategory = () => {
  const { register, handleSubmit, reset, formState } =
    useForm<AddCategoryValues>({
      resolver: zodResolver(addCategorySchema),
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
    <section className="flex max-w-[250px] flex-col items-center gap-4 sm:max-w-full">
      <h4 className="mb-8 text-center text-4xl font-bold text-slate-500">
        Add Category
      </h4>
      <form
        className="flex w-full flex-col items-center gap-4"
        onSubmit={handleSubmit(addCategory)}
      >
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            type="text"
            placeholder="Category Name"
            {...register('category')}
            error={errors.category?.message}
          />
          <ErrorMessage
            errors={errors}
            name="category"
            render={({ message }) => (
              <p className="text-red-400 font-semibold">{message}</p>
            )}
          />
        </div>

        <FormButton text="Add Category" loading={false} />
      </form>
    </section>
  )
}
export default AddCategory

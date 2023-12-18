import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import FullscreenLoading from '../components/FullscreenLoading'
import { useAdminContext } from '../context/AdminContext'
import { useAuthContext } from '../context/AuthContext'

const AddCategory = () => {
  const { token } = useAuthContext()!
  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      category: '',
      token: token.token,
    },
  })

  const { addCategory, addCategorySuccess, addCategoryLoading } =
    useAdminContext()!

  useEffect(() => {
    reset()
  }, [addCategorySuccess])
  const { errors } = formState

  if (addCategoryLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="flex flex-col gap-4 items-center">
      <h4 className="text-4xl font-semibold">Add Category</h4>
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

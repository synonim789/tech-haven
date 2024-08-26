import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/Input'
import { useEditCategoryMutation } from '../../features/adminCategories/categoriesApiSlice'

type Props = {
  name: string
  id: string
}

type DataType = {
  name?: string
}

const EditCategory = ({ name, id }: Props) => {
  const [openCategory, setOpenCategory] = useState(false)
  const { register, handleSubmit } = useForm()
  const [editCategory] = useEditCategoryMutation()

  const submit = async (data: DataType) => {
    await editCategory({ id: id, name: data.name })
    setOpenCategory(false)
  }

  return (
    <div className="my-5 max-w-[250px] rounded-xl border-2 border-solid border-slate-300 bg-white px-10 py-5 shadow-lg sm:max-w-full dark:border-none dark:bg-[#222427] dark:text-slate-500">
      <div className="flex items-center justify-between">
        <p className="font-bold capitalize">{name}</p>
        {openCategory === false && (
          <IoMdArrowDropdown
            size={'25px'}
            className="cursor-pointer"
            onClick={() => setOpenCategory(true)}
          />
        )}
        {openCategory && (
          <IoMdArrowDropup
            size={'25px'}
            className="cursor-pointer"
            onClick={() => setOpenCategory(false)}
          />
        )}
      </div>

      {openCategory && (
        <form
          onSubmit={handleSubmit(submit)}
          className="mt-5 flex flex-col items-center justify-between gap-5 md:flex-row md:items-center"
        >
          <FormInput
            register={{ ...register('name') }}
            name="category"
            type="text"
          />
          <FormButton loading={false} text="edit" />
        </form>
      )}
    </div>
  )
}
export default EditCategory

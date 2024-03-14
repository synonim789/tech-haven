import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import FormButton from '../../components/form/FormButton'
import FormInput from '../../components/form/FormInput'
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
    const result = await editCategory({ id: id, name: data.name })
    setOpenCategory(false)
  }

  return (
    <div className="bg-white dark:bg-[#222427] dark:border-none dark:text-slate-500 my-5 px-10 py-5 w-full border-[2px] border-solid border-slate-300 shadow-lg rounded-xl">
      <div className="flex justify-between items-center">
        <p className="capitalize font-bold ">{name}</p>
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
          className="flex flex-col md:flex-row items-center md:items-end  justify-between gap-5 mt-5"
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

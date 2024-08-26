import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import FormButton from '../../components/form/FormButton'
import Input from '../../components/form/Input'
import Label from '../../components/form/Label'
import { useEditCategoryMutation } from '../../features/adminCategories/categoriesApiSlice'
import {
  editCategorySchema,
  EditCategoryValues,
} from '../../validation/category'

type Props = {
  name: string
  id: string
}

const EditCategory = ({ name, id }: Props) => {
  const [openCategory, setOpenCategory] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditCategoryValues>({
    resolver: zodResolver(editCategorySchema),
    defaultValues: {
      name: name,
    },
  })
  const [editCategory] = useEditCategoryMutation()

  const submit = async (data: EditCategoryValues) => {
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
          className="mt-5 flex flex-col gap-5 md:flex-row md:items-end "
        >
          <div>
            <Label>Name</Label>
            <Input
              placeholder="Category Name"
              type="text"
              {...register('name')}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-red-500 font-semibold">{message}</p>
              )}
            />
          </div>

          <FormButton loading={false} text="edit" className="w-fit" />
        </form>
      )}
    </div>
  )
}
export default EditCategory

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io'
import { useAdminContext } from '../context/AdminContext'
import { useAuthContext } from '../context/AuthContext'
import FormButton from './FormButton'
import FormInput from './FormInput'

type Props = {
  name: string
  id: string
}
type data = {
  name: string
}

const EditCategory = ({ name, id }: Props) => {
  const [openCategory, setOpenCategory] = useState(false)
  const { register, handleSubmit } = useForm()
  const { token } = useAuthContext()!
  const { editCategory } = useAdminContext()!

  const submit = async (data: data) => {
    editCategory({ id: id, name: data.name, token: token.token })
    setOpenCategory(false)
  }

  return (
    <div className="bg-white my-5 px-10 py-5 w-full border-[2px] border-solid border-slate-300 shadow-lg rounded-xl">
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
          className="md:flex items-center justify-between gap-5  mt-5"
        >
          <FormInput
            register={{ ...register('name') }}
            name="category"
            type="text"
          />
          <FormButton loading={false} text="edit category" />
        </form>
      )}
    </div>
  )
}
export default EditCategory

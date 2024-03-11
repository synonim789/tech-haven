import { useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useChangeUserRoleMutation } from '../../features/adminUser/adminUserApiSlice'
import { UserType } from '../../types'

type Props = {
  user: UserType
}
const EditSingleUser = ({ user }: Props) => {
  const { name, email, role } = user
  const [changeUserRole, { isLoading, error }] = useChangeUserRoleMutation()

  useEffect(() => {
    if (error && 'data' in error) {
      toast.error(error.data.message)
    }
  }, [error])

  return (
    <div className="flex gap-5 items-center bg-white p-4 shadow-lg rounded-xl dark:bg-[#121212]">
      <FaUser size={'30px'} className="dark:text-slate-400" />

      <div>
        <p className="font-semibold text-xl text-slate-400">{name}</p>
        <p className="text-slate-600">{email}</p>
        {role === 'admin' && (
          <div className="flex gap-5 items-center mt-3">
            <p className="font-bold text-slate-400">admin</p>
            <button
              className="px-2 py-3 bg-[#405684] text-white font-bold rounded-xl hover:scale-105 transition hover:opacity-70"
              onClick={() => changeUserRole(user._id)}
            >
              {isLoading ? 'Changing...' : 'Change to User'}
            </button>
          </div>
        )}
        {role === 'user' && (
          <div className="flex gap-5 items-center mt-3">
            <p className="font-bold text-slate-400">user</p>
            <button
              className="px-2 py-3 bg-blue-500 text-white font-bold rounded-xl hover:scale-105 transition hover:opacity-70"
              onClick={() => changeUserRole(user._id)}
            >
              {isLoading ? 'Changing...' : ' Change to Admin'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default EditSingleUser

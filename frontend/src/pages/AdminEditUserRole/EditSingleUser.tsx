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
    <div className="flex items-center gap-5 rounded-xl bg-white p-4 shadow-lg dark:bg-[#222427]">
      <FaUser size={'30px'} className="dark:text-slate-400" />

      <div>
        <p className="text-xl font-semibold text-slate-400">{name}</p>
        <p className="text-slate-600">{email}</p>
        {role === 'admin' && (
          <div className="mt-3 flex items-center gap-5">
            <p className="font-bold text-slate-400">admin</p>
            <button
              className="rounded-xl bg-[#405684] px-2 py-3 font-bold text-white transition hover:scale-105 hover:opacity-70"
              onClick={() => changeUserRole(user._id)}
            >
              {isLoading ? 'Changing...' : 'Change to User'}
            </button>
          </div>
        )}
        {role === 'user' && (
          <div className="mt-3 flex items-center gap-5">
            <p className="font-bold text-slate-400">user</p>
            <button
              className="rounded-xl bg-blue-500 px-2 py-3 font-bold text-white transition hover:scale-105 hover:opacity-70"
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

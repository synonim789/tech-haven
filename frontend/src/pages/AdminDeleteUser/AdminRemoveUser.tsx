import { FaTrash, FaUser } from 'react-icons/fa'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useAdminDeleteUserMutation } from '../../features/adminUser/adminUserApiSlice'
import { UserType } from '../../types'

type Props = {
  user: UserType
}

const AdminRemoveUser = ({ user }: Props) => {
  const { name, email, role, _id: id } = user

  const [adminDeleteUser, { isLoading }] = useAdminDeleteUserMutation()

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-xl bg-white p-4 shadow-lg dark:bg-[#222427] ">
      <FaUser size={'30px'} className="dark:text-slate-400" />
      <div className="flex flex-col gap-5">
        <p className="text-xl font-semibold text-slate-400">{name}</p>
        <p className="text-slate-600">{email}</p>
        {role === 'admin' && (
          <p className="w-fit rounded-xl bg-blue-800 px-4 py-2 font-bold text-white">
            admin
          </p>
        )}
        {role === 'user' && (
          <p className="w-fit rounded-xl bg-green-700 px-4 py-2 font-bold text-white">
            user
          </p>
        )}
      </div>
      <button onClick={() => adminDeleteUser(id)}>
        <FaTrash className="text-3xl text-red-800 transition-opacity duration-300 hover:opacity-70" />
      </button>
    </div>
  )
}
export default AdminRemoveUser

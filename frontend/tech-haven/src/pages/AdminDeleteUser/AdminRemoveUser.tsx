import { FaTrash, FaUser } from 'react-icons/fa'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useAdminDeleteUserMutation } from '../../features/adminUser/adminUserApiSlice'
import { UserType } from '../../types'

type AdminRemoveUserProps = {
  user: UserType
}

const AdminRemoveUser = ({ user }: AdminRemoveUserProps) => {
  const { name, role, _id: id } = user

  const [adminDeleteUser, { isLoading }] = useAdminDeleteUserMutation()

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <div className="flex items-center bg-white p-4 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl justify-between gap-2">
      <FaUser size={'30px'} />
      <div className="flex flex-col gap-5">
        <p className="font-semibold text-xl">{name}</p>
        {role === 'admin' && (
          <p className="font-bold bg-blue-800 w-fit text-white px-4 py-2 rounded-xl">
            admin
          </p>
        )}
        {role === 'user' && (
          <p className="font-bold bg-green-700 w-fit text-white px-4 py-2 rounded-xl">
            user
          </p>
        )}
      </div>
      <button onClick={() => adminDeleteUser(id)}>
        <FaTrash className="text-red-800 text-3xl hover:opacity-70 transition-opacity duration-300" />
      </button>
    </div>
  )
}
export default AdminRemoveUser

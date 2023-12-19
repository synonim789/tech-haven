import { FaUser } from 'react-icons/fa'
import { useAdminContext } from '../../context/AdminContext'
import { useAuthContext2 } from '../../context/AuthContext2'
import { UserType } from '../../types'

type Props = {
  user: UserType
}
const EditSingleUser = ({ user }: Props) => {
  const { name, email, role } = user
  const { changeUserRole } = useAdminContext()!
  const { token } = useAuthContext2()!
  return (
    <div className="flex gap-5 items-center bg-white p-4 border-[2px] border-solid border-slate-300 shadow-lg rounded-xl">
      <FaUser size={'30px'} />

      <div>
        <p className="font-semibold text-xl">{name}</p>
        <p>{email}</p>
        {role === 'admin' && (
          <div className="flex gap-5 items-center mt-3">
            <p className="font-bold">admin</p>
            <button
              className="px-2 py-3 bg-[#120b90] text-white font-bold rounded-xl hover:scale-105 transition hover:opacity-70"
              onClick={() =>
                changeUserRole({ id: user._id, token: token })
              }
            >
              Change to User
            </button>
          </div>
        )}
        {role === 'user' && (
          <div className="flex gap-5 items-center mt-3">
            <p className="font-bold">user</p>
            <button
              className="px-2 py-3 bg-blue-500 text-white font-bold rounded-xl hover:scale-105 transition hover:opacity-70"
              onClick={() =>
                changeUserRole({ id: user._id, token: token })
              }
            >
              Change to Admin
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
export default EditSingleUser

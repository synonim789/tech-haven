import { createPortal } from 'react-dom'
import { useAuthContext2 } from '../../context/AuthContext2'
import { useUserContext } from '../../context/UserContext'

type DeleteUserModalPropsType = {
  open: boolean
  onClose: () => void
}

const DeleteUserModal = ({ open, onClose }: DeleteUserModalPropsType) => {
  const { deleteUser, deleteUserLoading } = useUserContext()!
  const { token } = useAuthContext2()!

  if (deleteUserLoading) {
    return (
      <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-white z-50 p-14 flex flex-col items-center gap-14 rounded-3xl">
        Loading...
      </div>
    )
  }
  if (!open) return null
  return createPortal(
    <>
      <div className="fixed inset-0  z-40 bg-neutral-400 opacity-40" />
      <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-white z-50 p-14 flex flex-col items-center gap-14 rounded-3xl">
        <h3 className="text-3xl">Do you really want to delete your account?</h3>
        <div className="flex gap-14">
          <button
            className="px-4 py-2 text-[20px] font-bold text-white bg-green-700 rounded-xl hover:scale-105 hover:opacity-75"
            onClick={() => {
              deleteUser(token)
            }}
          >
            Yes, I do
          </button>
          <button
            className="px-4 py-2 text-[20px] font-bold text-white bg-red-500 rounded-xl hover:scale-105 hover:opacity-75"
            onClick={onClose}
          >
            No, I don&apos;t
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  )
}
export default DeleteUserModal

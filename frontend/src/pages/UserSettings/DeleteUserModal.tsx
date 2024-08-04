import FocusTrap from 'focus-trap-react'
import { createPortal } from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { useDeleteUserMutation } from '../../features/user/userApiSlice'
import { clearUser } from '../../features/user/userSlice'
import { RootState } from '../../store'
import { decodeToken } from '../../utils/decodeToken'

type Props = {
  open: boolean
  onClose: () => void
}

const DeleteUserModal = ({ open, onClose }: Props) => {
  const [deleteUser, { isLoading }] = useDeleteUserMutation()
  const dispatch = useDispatch()
  const token = useSelector((state: RootState) => state.auth.token)

  const deleteHandler = () => {
    const decodedToken = decodeToken(token)
    deleteUser(decodedToken?.userId)
    dispatch(logout())
    dispatch(clearUser())
  }

  if (isLoading) {
    return (
      <div className="fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 bg-white z-50 p-14 flex flex-col items-center gap-14 rounded-3xl">
        Loading...
      </div>
    )
  }
  if (!open) return null
  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-neutral-400 opacity-40" />
      <FocusTrap>
        <dialog className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white z-50 p-8 md:p-14 flex flex-col items-center gap-4 md:gap-8 rounded-3xl dark:bg-[#121212] dark:text-slate-400 w-full md:w-fit">
          <h3 className="text-2xl md:text-3xl font-bold text-center">
            Do you really want to delete your account?
          </h3>
          <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 md:gap-8">
            <button
              className="px-4 py-2 text-[20px] font-bold text-white bg-green-700 rounded-xl hover:scale-105 hover:opacity-75"
              onClick={() => {
                deleteHandler()
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
        </dialog>
      </FocusTrap>
    </>,
    document.getElementById('portal')!
  )
}
export default DeleteUserModal

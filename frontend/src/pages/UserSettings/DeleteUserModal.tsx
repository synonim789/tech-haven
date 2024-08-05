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
      <div className="fixed left-[50%] top-[50%] z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-14 rounded-3xl bg-white p-14">
        Loading...
      </div>
    )
  }
  if (!open) return null
  return createPortal(
    <>
      <div className="fixed inset-0 z-40 bg-neutral-400 opacity-40" />
      <FocusTrap>
        <dialog className="fixed left-1/2 top-1/2 z-50 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4 rounded-3xl bg-white p-8 md:w-fit md:gap-8 md:p-14 dark:bg-[#121212] dark:text-slate-400">
          <h3 className="text-center text-2xl font-bold md:text-3xl">
            Do you really want to delete your account?
          </h3>
          <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
            <button
              className="rounded-xl bg-green-700 px-4 py-2 text-[20px] font-bold text-white hover:scale-105 hover:opacity-75"
              onClick={() => {
                deleteHandler()
              }}
            >
              Yes, I do
            </button>
            <button
              className="rounded-xl bg-red-500 px-4 py-2 text-[20px] font-bold text-white hover:scale-105 hover:opacity-75"
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

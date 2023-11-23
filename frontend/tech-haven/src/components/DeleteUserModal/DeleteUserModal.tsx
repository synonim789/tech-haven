import { createPortal } from 'react-dom'
import { useAuthContext } from '../../context/AuthContext'
import { useUserContext } from '../../context/UserContext'
import './DeleteUserModal.css'

type DeleteUserModalPropsType = {
  open: boolean
  onClose: () => void
}

const DeleteUserModal = ({ open, onClose }: DeleteUserModalPropsType) => {
  const { deleteUser, deleteUserLoading } = useUserContext()!
  const { token } = useAuthContext()!

  if (deleteUserLoading) {
    return <div className="modal">Loading...</div>
  }
  if (!open) return null
  return createPortal(
    <>
      <div className="modal__overlay" />
      <div className="modal">
        <h3 className="modal__title">
          Do you really want to delete your account?
        </h3>
        <div className="modal__buttons">
          <button
            className="modal__delete"
            onClick={() => {
              deleteUser(token)
            }}
          >
            Yes, I do
          </button>
          <button className="modal__close" onClick={onClose}>
            No, I don&apos;t
          </button>
        </div>
      </div>
    </>,
    document.getElementById('portal')!
  )
}
export default DeleteUserModal

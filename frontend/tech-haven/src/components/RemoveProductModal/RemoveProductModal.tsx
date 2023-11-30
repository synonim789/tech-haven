import { useAdminContext } from '../../context/AdminContext'
import { useAuthContext } from '../../context/AuthContext'
import './RemoveProductModal.css'

type RemoveProductModalProps = {
  close: () => void
  clear: () => void
  id: string
}

const RemoveProductModal = ({ close, id, clear }: RemoveProductModalProps) => {
  const { deleteProduct } = useAdminContext()!
  const { token } = useAuthContext()!
  return (
    <div className="modal__overlay">
      <div className="modal">
        <h3 className="modal__title">
          Do you really want to delete this product?
        </h3>
        <div className="modal__buttons">
          <button
            className="modal__delete"
            onClick={() => {
              deleteProduct({ id, token })
              close()
              clear()
            }}
          >
            Yes, I do
          </button>
          <button className="modal__close" onClick={close}>
            No, I don&apos;t
          </button>
        </div>
      </div>
    </div>
  )
}
export default RemoveProductModal

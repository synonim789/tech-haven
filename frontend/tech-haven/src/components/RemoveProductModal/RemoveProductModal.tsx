import { useAdminContext } from '../../context/AdminContext'
import { useAuthContext } from '../../context/AuthContext'
import './RemoveProductModal.css'

type RemoveProductModalProps = {
  close: () => void
  id: string
}

const RemoveProductModal = ({ close, id }: RemoveProductModalProps) => {
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

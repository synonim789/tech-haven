import { CellContext } from '@tanstack/react-table'
import FocusTrap from 'focus-trap-react'
import { createPortal } from 'react-dom'
import { IoMdClose } from 'react-icons/io'
import { OrderType } from '../../types'
import AdminOrderProduct from './AdminOrderProduct'

type Props = {
  modalOpen: boolean
  setModalOpen: (id: string | null) => void
  info: CellContext<OrderType, unknown>
}

const AdminOrderInfo = ({ modalOpen, setModalOpen, info }: Props) => {
  const order = info.row.original
  if (!order) return null
  if (!modalOpen) return null
  
  return createPortal(
    <>
      <div className="fixed inset-0  z-40 bg-neutral-400 opacity-40" />
      <FocusTrap>
        <dialog
          className="fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 bg-white z-50 p-6 w-full md:p-14 flex flex-col items-center rounded-3xl gap-5 dark:bg-[#121212] dark:text-slate-400 text-center xl:w-auto
           overflow-y-auto h-screen xl:h-auto md:overflow-y-hidden overflow-x-hidden"
          role="dialog"
        >
          <button
            onClick={() => setModalOpen(null)}
            className="w-full flex justify-end font-bold"
          >
            <IoMdClose size={30} />
          </button>
          <div className="py-4 text-left px-6 ">
            <h3 className="text-xl md:text-3xl w-full break-all text-center">
              {order._id}
            </h3>
            <div className="text-left text-xl">
              <h4 className="text-2xl md:text-4xl font-bold my-3">User:</h4>
              <div className="text-base md:text-xl">
                <span>Name: </span>
                <span>{order.user.name}</span>
              </div>
              <div className="text-base md:text-xl">
                <span>Address: </span>
                <span>{order.shippingAddress1}</span>,{' '}
                <span>{order.shippingAddress2}</span>
              </div>
              <div className="text-base md:text-xl">
                <span>Phone: </span>
                <span>{order.phone}</span>
              </div>
            </div>

            <div className="text-left text-xl">
              <h4 className="text-3xl md:text-4xl font-bold my-3">Products:</h4>
              <div className="flex flex-col gap-5">
                {order.orderItems.map((product) => (
                  <AdminOrderProduct
                    key={product._id}
                    id={product.productId}
                    quantity={product.quantity}
                  />
                ))}
              </div>
            </div>
          </div>
        </dialog>
      </FocusTrap>
    </>,
    document.getElementById('portal')!
  )
}
export default AdminOrderInfo

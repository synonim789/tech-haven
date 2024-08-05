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
          className="fixed left-1/2 top-1/2 z-50 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 overflow-y-auto overflow-x-hidden rounded-3xl bg-white p-6 text-center md:overflow-y-hidden md:p-14
           xl:size-auto dark:bg-[#121212] dark:text-slate-400"
          role="dialog"
        >
          <button
            onClick={() => setModalOpen(null)}
            className="flex w-full justify-end font-bold"
          >
            <IoMdClose size={30} />
          </button>
          <div className="px-6 py-4 text-left ">
            <h3 className="w-full break-all text-center text-xl md:text-3xl">
              {order._id}
            </h3>
            <div className="text-left text-xl">
              <h4 className="my-3 text-2xl font-bold md:text-4xl">User:</h4>
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
              <h4 className="my-3 text-3xl font-bold md:text-4xl">Products:</h4>
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

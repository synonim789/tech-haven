import { CellContext } from '@tanstack/react-table'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaCheck, FaRegEye } from 'react-icons/fa'
import { MdOutlineModeEdit } from 'react-icons/md'
import { useEditOrderMutation } from '../../features/adminOrder/adminOrderApiSlice'
import { OrderType } from '../../types'
import AdminOrderInfo from './AdminOrderInfo'

type Props = {
  props: CellContext<OrderType, unknown>
  show: boolean
  setShow: (id: string | boolean) => void
  isEditing: boolean
  setIsEditing: (id: string | null) => void
  editOrderInfo: {
    id: string
    status: string
  } | null
  setModalOpen: (id: string | null) => void
  modalOpen: boolean
}

const AdminOrderOptions = ({
  props,
  show,
  setShow,
  isEditing,
  setIsEditing,
  editOrderInfo,
  setModalOpen,
  modalOpen,
}: Props) => {
  const handleEdit = () => {
    setShow(false)
    setIsEditing(props.row.original._id)
  }

  const handleInfo = () => {
    setShow(false)
    setModalOpen(props.row.original._id)
  }

  const [update, _result] = useEditOrderMutation()

  const handleSubmit = () => {
    if (!editOrderInfo?.id || !editOrderInfo?.status) {
      return
    }
    update({ id: editOrderInfo?.id, status: editOrderInfo?.status })
    setIsEditing(null)
  }

  const handleEditButton = () => {
    if (show === false) {
      setShow(props.row.original._id)
    } else {
      setShow(false)
    }
  }

  return (
    <>
      {isEditing ? (
        <button
          className="rounded-md bg-green-300 p-1 transition-all hover:scale-110 hover:opacity-90"
          onClick={handleSubmit}
        >
          <FaCheck className="text-green-600" size={20} />
        </button>
      ) : (
        <button onClick={handleEditButton} className="">
          <BsThreeDotsVertical
            size={25}
            className="relative z-10 cursor-pointer"
          />
        </button>
      )}

      {show && (
        <div className="absolute z-50 flex flex-col items-start overflow-hidden rounded-md bg-white text-lg font-bold text-gray-600">
          <button
            className="flex w-full items-center gap-2 p-2 text-left hover:bg-gray-300 "
            onClick={handleEdit}
          >
            <MdOutlineModeEdit className="text-blue-700" />
            Edit
          </button>
          <button
            onClick={handleInfo}
            className="flex w-full items-center gap-2 p-2 text-left hover:bg-gray-300"
          >
            <FaRegEye className="text-green-800" />
            See More
          </button>
        </div>
      )}
      {modalOpen && (
        <AdminOrderInfo
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          info={props}
        />
      )}
    </>
  )
}
export default AdminOrderOptions

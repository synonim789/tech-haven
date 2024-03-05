import { CellContext } from '@tanstack/react-table'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaCheck, FaRegEye } from 'react-icons/fa'
import { MdOutlineModeEdit } from 'react-icons/md'
import { useEditOrderMutation } from '../../features/adminOrder/adminOrderApiSlice'
import { Order } from './AdminOrderTable'

type Props = {
  props: CellContext<Order, unknown>
  show: boolean
  setShow: (id: string | null) => void
  isEditing: boolean
  setIsEditing: (id: string | null) => void
  editOrderInfo: {
    id: string
    status: string
  } | null
}

const AdminOrderOptions = ({
  props,
  show,
  setShow,
  isEditing,
  setIsEditing,
  editOrderInfo,
}: Props) => {
  const handleEdit = () => {
    setShow(null)
    setIsEditing(props.row.original._id)
  }

  const [update, result] = useEditOrderMutation()

  const handleSubmit = () => {
    if (!editOrderInfo?.id || !editOrderInfo?.status) {
      return
    }
    update({ id: editOrderInfo?.id, status: editOrderInfo?.status })
    setIsEditing(null)
    console.log(result.data)
  }

  return (
    <>
      {isEditing ? (
        <button
          className="p-1 bg-green-300 rounded-md hover:scale-110 transition-all hover:opacity-90"
          onClick={handleSubmit}
        >
          <FaCheck className="text-green-600" size={20} />
        </button>
      ) : (
        <button onClick={() => setShow(props.row.original._id)}>
          <BsThreeDotsVertical
            size={25}
            className="cursor-pointer relative z-10"
          />
        </button>
      )}

      {show && (
        <div className="absolute bg-white text-gray-600 flex flex-col items-start z-50 rounded-md font-bold text-lg overflow-hidden">
          <button
            className="hover:bg-gray-300 w-full text-left p-2 flex items-center gap-2 "
            onClick={handleEdit}
          >
            <MdOutlineModeEdit className="text-blue-700" />
            Edit
          </button>
          <button
            onClick={() => setShow(null)}
            className="hover:bg-gray-300 w-full text-left p-2 flex items-center gap-2"
          >
            <FaRegEye className="text-green-800" />
            See More
          </button>
        </div>
      )}
    </>
  )
}
export default AdminOrderOptions

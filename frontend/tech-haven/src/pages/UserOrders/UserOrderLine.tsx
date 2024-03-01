import { Link } from 'react-router-dom'
import { ORDER_STATUS } from '../../data/orderStatus'
import { formatPrice } from '../../utils/formatPrice'

type Props = {
  order: {
    _id: string
    orderItems: {}
    shippingAddress1: string
    shippingAddress2: string
    phone: string
    status: string
    total: number
    user: string
    subtotal: number
    dateOrdered: string
  }
}

const UserOrderLine = ({ order }: Props) => {
  const background = ORDER_STATUS.find(
    (orderStatus) => orderStatus.value === order.status
  )?.background
  const label = ORDER_STATUS.find(
    (orderStatus) => orderStatus.value === order.status
  )?.label

  return (
    <tr
      className="border-b-2 border-b-gray-500 dark:text-slate-400"
      key={order._id}
    >
      <td
        className="block md:table-cell p-2 before:content-[attr(data-cell)] before:mr-1 before:font-bold md:before:content-none"
        data-cell="Id"
      >
        {order._id}
      </td>
      <td
        className="block md:table-cell p-2 before:content-[attr(data-cell)] before:mr-1 before:font-bold md:before:content-none"
        data-cell="Date"
      >
        {new Date(order.dateOrdered).toLocaleDateString()}
      </td>
      <td
        className="block md:table-cell p-2 before:content-[attr(data-cell)] before:mr-1 before:font-bold md:before:content-none"
        data-cell="To Pay"
      >
        {formatPrice(order.total)}
      </td>
      <td
        className="flex items-center md:table-cell p-2 before:content-[attr(data-cell)] before:mr-1 before:font-bold md:before:content-none"
        data-cell="Status"
      >
        <p
          className={`text-white font-bold px-4 py-2 rounded-full text-center ${background}`}
        >
          {label}
        </p>
      </td>
      <td className="block md:table-cell p-2">
        <Link to={`${order._id}`} className="text-blue-500 font-semibold">
          Details
        </Link>
      </td>
    </tr>
  )
}
export default UserOrderLine

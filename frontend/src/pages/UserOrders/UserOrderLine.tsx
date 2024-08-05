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
        className="block p-2 before:mr-1 before:font-bold before:content-[attr(data-cell)] md:table-cell md:before:content-none"
        data-cell="Id"
      >
        {order._id}
      </td>
      <td
        className="block p-2 before:mr-1 before:font-bold before:content-[attr(data-cell)] md:table-cell md:before:content-none"
        data-cell="Date"
      >
        {new Date(order.dateOrdered).toLocaleDateString()}
      </td>
      <td
        className="block p-2 before:mr-1 before:font-bold before:content-[attr(data-cell)] md:table-cell md:before:content-none"
        data-cell="To Pay"
      >
        {formatPrice(order.total)}
      </td>
      <td
        className="flex items-center p-2 before:mr-1 before:font-bold before:content-[attr(data-cell)] md:table-cell md:before:content-none"
        data-cell="Status"
      >
        <p
          className={`rounded-full px-4 py-2 text-center font-bold ${background}`}
        >
          {label}
        </p>
      </td>
      <td className="block p-2 md:table-cell">
        <Link to={`${order._id}`} className="font-semibold text-blue-500">
          Details
        </Link>
      </td>
    </tr>
  )
}
export default UserOrderLine

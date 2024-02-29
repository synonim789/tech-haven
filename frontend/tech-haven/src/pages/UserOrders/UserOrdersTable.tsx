import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'

type UserOrdersProps = {
  userOrders: {
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
  }[]
}

const UserOrdersTable = ({ userOrders }: UserOrdersProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="border-b-2 border-b-gray-500 border-spacing-0 hidden md:table-row dark:text-slate-400">
          <th>ID</th>
          <th>Date</th>
          <th>To Pay</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userOrders.map((order) => {
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
                  className={`text-white font-bold px-4 py-2 rounded-full text-center ${
                    order.status === 'Pending'
                      ? 'bg-yellow-500'
                      : order.status === 'Completed'
                      ? 'bg-green-600'
                      : 'bg-red-500'
                  }`}
                >
                  {order.status}
                </p>
              </td>
              <td className="block md:table-cell p-2">
                <Link
                  to={`${order._id}`}
                  className="text-blue-500 font-semibold"
                >
                  Details
                </Link>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
export default UserOrdersTable

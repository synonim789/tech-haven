import { OrderItems } from '../../features/orders/ordersApiSlice'
import UserOrderLine from './UserOrderLine'

type Props = {
  userOrders: {
    _id: string
    orderItems: OrderItems[]
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

const UserOrdersTable = ({ userOrders }: Props) => {
  console.log(userOrders)
  return (
    <table className="w-full">
      <thead>
        <tr className="hidden border-spacing-0 border-b-2 border-b-gray-500 md:table-row dark:text-slate-400">
          <th>ID</th>
          <th>Date</th>
          <th>To Pay</th>
          <th>Status</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userOrders.map((order) => {
          return <UserOrderLine order={order} key={order._id} />
        })}
      </tbody>
    </table>
  )
}
export default UserOrdersTable

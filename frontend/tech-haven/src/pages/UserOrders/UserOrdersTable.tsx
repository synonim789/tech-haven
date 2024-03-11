import UserOrderLine from './UserOrderLine'

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
          return <UserOrderLine order={order} key={order._id} />
        })}
      </tbody>
    </table>
  )
}
export default UserOrdersTable

import { useEffect, useState } from 'react'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { ORDER_STATUS } from '../../data/orderStatus'
import { useGetAdminOrdersQuery } from '../../features/adminOrder/adminOrderApiSlice'
import { OrderType } from '../../types'
import AdminOrderTable from './AdminOrderTable'

const AdminOrderPage = () => {
  const { data, isLoading } = useGetAdminOrdersQuery()
  const [orders, setOrders] = useState<OrderType[] | undefined>(undefined)
  const [filteredOrders, setFilteredOrders] = useState<
    OrderType[] | null | undefined
  >(null)

  useEffect(() => {
    if (data) {
      setOrders(data)
    }
  }, [data])

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== 'all') {
      setFilteredOrders(
        orders?.filter((item) => item.status === e.target.value)
      )
    } else {
      setFilteredOrders(orders)
    }
  }

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-slate-500">Orders</h2>
      <div className="flex justify-end">
        <select
          onChange={(e) => handleStatusFilter(e)}
          className="px-3 py-2 border-[2px] border-solid border-slate-600 placeholder:text-slate-500 dark:text-gray-400 outline-none shadow-lg rounded-md dark:bg-transparent placeholder:capitalize "
        >
          <option value="all">All</option>
          {ORDER_STATUS.map((order, index) => (
            <option value={order.value} key={index} className="bg-black">
              {order.label}
            </option>
          ))}
        </select>
      </div>

      <AdminOrderTable
        orders={filteredOrders !== null ? filteredOrders : orders}
      />
    </section>
  )
}
export default AdminOrderPage

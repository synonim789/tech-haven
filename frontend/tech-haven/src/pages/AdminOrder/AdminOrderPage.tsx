import { useEffect, useState } from 'react'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { ORDER_STATUS } from '../../data/orderStatus'
import { useGetAdminOrdersQuery } from '../../features/adminOrder/adminOrderApiSlice'
import { OrderType } from '../../types'
import AdminOrderTable from './AdminOrderTable'

const AdminOrderPage = () => {
  const { data, isLoading } = useGetAdminOrdersQuery()
  const [orders, setOrders] = useState<OrderType[] | null>(null)
  const [ordersPerPage, setOrdersPerPage] = useState(10)
  const [filteredOrders, setFilteredOrders] = useState<OrderType[] | null>(null)

  useEffect(() => {
    if (data) {
      setOrders(data)
    }
  }, [data])

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value !== 'all') {
      if (orders) {
        setFilteredOrders(
          orders.filter((item) => item.status === e.target.value)
        )
      }
    } else {
      setFilteredOrders(orders)
    }
  }

  if (isLoading) {
    return <FullscreenLoading />
  }

  if (!orders) {
    return (
      <h3 className="text-slate-500 font-bold text-center text-3xl">
        No Orders Found
      </h3>
    )
  }

  return (
    <section className="space-y-8">
      <h2 className="text-4xl font-bold text-center text-slate-500">Orders</h2>
      <div className="flex justify-end gap-x-5">
        <select
          className="px-3 py-2 border-[2px] border-solid border-slate-600 placeholder:text-slate-500 dark:text-gray-400 outline-none shadow-lg dark:bg-transparent placeholder:capitalize rounded-xl"
          onChange={(e) => setOrdersPerPage(parseInt(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option value={pageSize} key={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>
        <select
          onChange={(e) => handleStatusFilter(e)}
          className="px-3 py-2 border-[2px] border-solid border-slate-600 placeholder:text-slate-500 dark:text-gray-400 outline-none shadow-lg dark:bg-transparent placeholder:capitalize rounded-xl"
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
        ordersPerPage={ordersPerPage}
        setOrders={filteredOrders !== null ? setFilteredOrders : setOrders}
      />
    </section>
  )
}
export default AdminOrderPage

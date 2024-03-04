import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import OrderPagination from '../../components/ui/OrderPagination'
import { OrderType } from '../../types'
import { formatPrice } from '../../utils/formatPrice'
import OrderStatusCell from './OrderStatusCell'

export type Order = {
  _id: string
  user: {
    name: string
  }
  dateOrdered: string
  status: string
  total: number
}

const columHelper = createColumnHelper<Order>()
const columns = [
  columHelper.accessor('_id', {
    header: 'ID',
    cell: (info) => info.getValue(),
  }),
  columHelper.accessor('dateOrdered', {
    header: 'Created at',
    cell: (info) => new Date(info.getValue()).toLocaleDateString(),
  }),
  columHelper.accessor('user.name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columHelper.accessor('status', {
    header: 'Status',
    cell: (info) => <OrderStatusCell value={info} />,
  }),
  columHelper.accessor('total', {
    header: () => 'Total',
    cell: (info) => formatPrice(info.getValue()),
  }),
  columHelper.display({
    id: 'Actions',
    cell: (props) => (
      <BsThreeDotsVertical size={25} className="cursor-pointer" />
    ),
  }),
]

type Props = {
  orders: OrderType[] | undefined
  ordersPerPage: number
}

const AdminOrderTable = ({ orders, ordersPerPage }: Props) => {
  if (!orders || orders.length === 0) {
    return <h3>No Orders Found</h3>
  }

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: ordersPerPage,
  })

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    state: {
      pagination,
    },
  })

  useEffect(() => {
    setPagination({
      pageIndex: 0,
      pageSize: ordersPerPage,
    })
  }, [ordersPerPage])

  return (
    <>
      <div>
        <table className="w-full border rounded-xl overflow-hidden">
          <thead className="bg-gray-500 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-3 text-sm font-semibold tracking-wide"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="dark:bg-gray-700 dark:text-white">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="p-3 text-sm text-slate-700 dark:text-slate-100"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <OrderPagination
        currentPage={pagination.pageIndex}
        numOfPages={table.getPageCount()}
        setPage={table.setPageIndex}
      />
    </>
  )
}
export default AdminOrderTable

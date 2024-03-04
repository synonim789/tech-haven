import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { BsThreeDotsVertical } from 'react-icons/bs'
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
  columHelper.accessor('action', {
    header: () => 'Actions',
    cell: () => <BsThreeDotsVertical className="cursor-pointer" size={25} />,
  }),
]

type Props = {
  orders: OrderType[] | undefined
}

const AdminOrderTable = ({ orders }: Props) => {
  if (!orders) {
    return <h3>No Orders Found</h3>
  }

  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
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
  )
}
export default AdminOrderTable

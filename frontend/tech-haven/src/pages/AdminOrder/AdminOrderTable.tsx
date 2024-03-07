import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import OrderPagination from '../../components/ui/OrderPagination'
import { OrderType } from '../../types'
import { formatPrice } from '../../utils/formatPrice'
import AdminOrderOptions from './AdminOrderOptions'
import OrderStatusCell from './OrderStatusCell'
import OrderStatusEdit from './OrderStatusEdit'

type Props = {
  orders: OrderType[]
  ordersPerPage: number
  setOrders: React.Dispatch<React.SetStateAction<OrderType[] | null>>
}

const AdminOrderTable = ({ orders, ordersPerPage, setOrders }: Props) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: ordersPerPage,
  })
  const [showOptions, setShowOptions] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editOrderInfo, setEditOrderInfo] = useState<null | {
    id: string
    status: string
  }>(null)
  const [modalOpen, setModalOpen] = useState<string | null>(null)

  const columHelper = createColumnHelper<OrderType>()
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
      cell: (info) =>
        isEditing === info.row.original._id ? (
          <OrderStatusEdit
            editOrderInfo={handleSetEditOrderInfo}
            name={info.getValue()}
            id={info.row.original._id}
          />
        ) : (
          <OrderStatusCell value={info} />
        ),
    }),
    columHelper.accessor('total', {
      header: () => 'Total',
      cell: (info) => formatPrice(info.getValue()),
    }),
    columHelper.display({
      id: 'Actions',
      cell: (props) => (
        <AdminOrderOptions
          props={props}
          show={props.row.original._id === showOptions}
          setShow={handleShow}
          isEditing={props.row.original._id === isEditing}
          setIsEditing={handleEditing}
          editOrderInfo={editOrderInfo}
          setModalOpen={handleModalOpen}
          modalOpen={props.row.original._id === modalOpen}
        />
      ),
    }),
  ]

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

  const handleEditing = (id: string | null) => {
    setIsEditing(id)
  }

  const handleShow = (id: string | null) => {
    setShowOptions(id)
  }

  const handleSetEditOrderInfo = (id: string, status: string) => {
    setEditOrderInfo({
      id: id,
      status: status,
    })

    setOrders((prevState: OrderType[] | null) => {
      if (prevState === null) {
        return prevState
      }

      return prevState.map((oldOrder) => {
        if (oldOrder._id === id) {
          return {
            ...oldOrder,
            status: status,
          }
        } else {
          return oldOrder
        }
      })
    })
  }

  const handleModalOpen = (id: string | null) => {
    setModalOpen(id)
  }

  if (!orders || orders.length === 0) {
    return (
      <h3 className="text-slate-500 font-bold text-center text-3xl">
        No Orders Found
      </h3>
    )
  }

  return (
    <>
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
      <OrderPagination
        currentPage={pagination.pageIndex}
        numOfPages={table.getPageCount()}
        setPage={table.setPageIndex}
      />
    </>
  )
}
export default AdminOrderTable

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetUserOrderQuery } from '../../features/orders/ordersApiSlice'
import { RootState } from '../../store'
import UserOrderPagination from './UserOrderPagination'
import UserOrdersTable from './UserOrdersTable'

const UserOrderPage = () => {
  const userId = useSelector((state: RootState) => state.user.user?._id)
  const [page, setPage] = useState(0)

  const { data, isLoading, isSuccess } = useGetUserOrderQuery({
    id: userId,
    page: page,
  })

  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    if (isSuccess) {
      setTotalPages(data.total)
    }
  }, [isSuccess])

  if (data?.userOrders && data.userOrders.length < 1) {
    return <h2 className="text-2xl font-bold">Orders not Found</h2>
  }

  if (isLoading) {
    return <FullscreenLoading />
  }

  if (isSuccess) {
    return (
      <section>
        <div className="flex flex-col">
          <UserOrdersTable userOrders={data.userOrders} />
          <UserOrderPagination
            currentPage={page}
            numOfPages={totalPages}
            setPage={setPage}
          />
        </div>
      </section>
    )
  }
}
export default UserOrderPage

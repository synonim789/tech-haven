import {
  useGetOrderCountQuery,
  useGetTotalSalesQuery,
  useGetUserCountQuery,
} from '../../features/adminStatistics/adminStatisticsApiSlice'
import { formatPrice } from '../../utils/formatPrice'
import StatisticCard from './StatisticCard'

const AdminWelcomeStatisticsCards = () => {
  const { data: totalSalesData, isLoading: totalSalesLoading } =
    useGetTotalSalesQuery()
  const { data: totalOrderCountData, isLoading: totalOrderCountIsLoading } =
    useGetOrderCountQuery()
  const { data: userCountData, isLoading: userCountIsLoading } =
    useGetUserCountQuery()

  if (totalSalesLoading || totalOrderCountIsLoading || userCountIsLoading) {
    return <p>Loading...</p>
  }

  if (!totalSalesData || !totalOrderCountData || !userCountData) {
    return
  }

  return (
    <section className="flex flex-col lg:flex-row gap-y-3 lg:gap-x-3 lg:gap-y-0 items-center justify-center">
      <StatisticCard
        textColor="text-green-500"
        upperValue={formatPrice(totalSalesData.totalSales)}
        bottomValue="Total Sales"
      />
      <StatisticCard
        textColor="text-blue-500"
        upperValue={totalOrderCountData.count}
        bottomValue="Total Orders"
      />
      <StatisticCard
        textColor="text-yellow-500"
        upperValue={userCountData?.count}
        bottomValue="Users"
      />
    </section>
  )
}
export default AdminWelcomeStatisticsCards

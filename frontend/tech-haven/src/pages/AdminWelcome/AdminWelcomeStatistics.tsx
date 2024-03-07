import FullscreenLoading from '../../components/ui/FullscreenLoading'
import {
  useGetOrderCountQuery,
  useGetTotalSalesQuery,
  useGetUserCountQuery,
} from '../../features/adminStatistics/adminStatisticsApiSlice'
import { formatPrice } from '../../utils/formatPrice'
import StatisticCard from './StatisticCard'

const AdminWelcomeStatistics = () => {
  const { data: totalSalesData, isLoading: totalSalesLoading } =
    useGetTotalSalesQuery()
  const { data: totalOrderCountData, isLoading: totalOrderCountIsLoading } =
    useGetOrderCountQuery()
  const { data: userCountData, isLoading: userCountIsLoading } =
    useGetUserCountQuery()

  if (totalSalesLoading || totalOrderCountIsLoading || userCountIsLoading) {
    return <FullscreenLoading />
  }

  if (!totalSalesData || !totalOrderCountData || !userCountData) {
    return
  }

  return (
    <section className="flex flex-col xl:flex-row gap-y-3 xl:gap-x-3 xl:gap-y-0 flex-grow flex-nowrap w-full items-center justify-center">
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
      <div></div>
    </section>
  )
}
export default AdminWelcomeStatistics

import { useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { useGetSalesByDateQuery } from '../../features/adminStatistics/adminStatisticsApiSlice'

const AdminSalesByDate = () => {
  const { data, isLoading } = useGetSalesByDateQuery()
  const [salesData, setSalesData] = useState<{ _id: string; total: number }[]>(
    []
  )

  useEffect(() => {
    if (data) {
      const newData = data?.map((sale) => {
        const newPrice = sale.total / 100
        return {
          ...sale,
          total: newPrice,
        }
      })
      setSalesData(newData)
    }
  }, [data])

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (data === undefined) {
    return null
  }

  return (
    <div className="h-[600px] basis-2/3 space-y-5 rounded-2xl px-10 py-5  dark:bg-[#222427]">
      <p className="text-center text-2xl  text-lime-600">Sales By Date</p>
      <ResponsiveContainer height={530}>
        <BarChart data={salesData}>
          <XAxis dataKey="_id" />
          <YAxis dataKey="total" />
          <Tooltip />
          <Bar dataKey="total" barSize={30} fill="#62a30d" label="total" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
export default AdminSalesByDate

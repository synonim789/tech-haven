import { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { useGetSalesByCategoryQuery } from '../../features/adminStatistics/adminStatisticsApiSlice'

const AdminSalesByCategory = () => {
  const { data, isLoading } = useGetSalesByCategoryQuery()
  const [salesByCategory, setSalesByCategory] = useState<
    {
      category: string
      total: number
    }[]
  >([])

  useEffect(() => {
    if (data) {
      const newData = data.map((sale) => {
        const newPrice = sale.totalSales / 100
        return {
          category: sale.categoryName,
          total: newPrice,
        }
      })
      setSalesByCategory(newData)
    }
  }, [data])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <div className=" h-[370px] dark:bg-[#222427] px-10 py-5 rounded-2xl space-y-5 basis-2/6 flex flex-col items-center">
      <p className="text-center text-2xl text-purple-600">Sales By Category</p>
      <ResponsiveContainer height={300}>
        <PieChart>
          <Tooltip />
          <Pie
            data={salesByCategory}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            labelLine={false}
            paddingAngle={5}
            fill="#9333ea"
            dataKey="total"
            nameKey="category"
            height={'100%'}
          ></Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
export default AdminSalesByCategory

import { useState } from 'react'
import AdminSelect from '../../components/ui/AdminSelect'
import { useGetAllProductsQuery } from '../../features/products/products'
import { ProductType } from '../../types'
import RemoveProduct from './RemoveProduct'

const RemoveProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)
  const { data: products } = useGetAllProductsQuery()!

  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold mb-[30px]">Remove Product</h1>
      <AdminSelect
        options={products}
        value={value}
        onChange={(option: ProductType | null) => setValue(option)}
      />
      {value && <RemoveProduct product={value} clear={() => setValue(null)} />}
    </section>
  )
}
export default RemoveProductPage

import { useState } from 'react'
import AdminSelect from '../components/AdminSelect/AdminSelect'
import RemoveProduct from '../components/RemoveProduct/RemoveProduct'
import { useProductsContext } from '../context/products_context'
import { ProductType } from '../types'

const RemoveProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)
  const { products } = useProductsContext()!

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

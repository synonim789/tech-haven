import { useEffect, useState } from 'react'
import AdminSelect from '../../components/ui/AdminSelect'
import { useGetAllProductsQuery } from '../../features/products/products'
import { ProductType } from '../../types'
import EditProductForm from './EditProductForm'

const EdictProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)

  const { data: products } = useGetAllProductsQuery()

  useEffect(() => {
    setValue(null)
  }, [products])

  return (
    <section className="text-center w-full">
      <h4 className="mb-8 text-4xl font-bold text-center text-slate-500">
        Edit Product
      </h4>
      <AdminSelect
        options={products}
        value={value}
        onChange={(option: ProductType | null) => setValue(option)}
      />
      {value && <EditProductForm product={value} />}
    </section>
  )
}
export default EdictProductPage

import { useState } from 'react'
import AdminSelect from '../../components/ui/AdminSelect'
import { useGetAllProductsQuery } from '../../features/products/products'
import { ProductType } from '../../types'
import EditProductForm from './EditProductForm'

const EdictProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)

  const { data: products } = useGetAllProductsQuery()

  const handleProductUpdate = (updatedProduct: ProductType) => {
    setValue(updatedProduct)
  }

  return (
    <section>
      <h4 className="mb-8 text-4xl font-bold text-slate-500 text-center">
        Edit Product
      </h4>
      <AdminSelect
        options={products}
        value={value}
        onChange={(option: ProductType | null) => setValue(option)}
      />
      {value && <EditProductForm product={value} onUpdate={handleProductUpdate}/>}
    </section>
  )
}
export default EdictProductPage

import { useState } from 'react'
import AdminSelect from '../../components/ui/AdminSelect'
import { useGetAllProductsQuery } from '../../features/products/products'
import { ProductType } from '../../types'
import EditProductForm from './EditProductForm'

const EdictProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)

  const { data: products } = useGetAllProductsQuery()

  return (
    <>
      <h4 className="text-3xl font-semibold mb-4">Edit Product</h4>
      <AdminSelect
        options={products}
        value={value}
        onChange={(option: ProductType | null) => setValue(option)}
      />
      {value && <EditProductForm product={value} />}
    </>
  )
}
export default EdictProductPage

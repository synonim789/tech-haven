import { useState } from 'react'
import AdminSelect from '../components/AdminSelect'
import EditProductForm from '../components/EditProductForm'

import { useProductsContext } from '../context/products_context'
import { ProductType } from '../types'

const EdictProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)
  console.log(value)

  const { products } = useProductsContext()!
  return (
    <>
      <h4 className="text-3xl font-semibold">Edit Product</h4>
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

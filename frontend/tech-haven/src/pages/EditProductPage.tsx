import { useState } from 'react'
import AdminSelect from '../components/AdminSelect'
import EditProductForm from '../components/EditProductForm'
import FullscreenLoading from '../components/FullscreenLoading'
import { useAdminContext } from '../context/AdminContext'

import { useProductsContext } from '../context/products_context'
import { ProductType } from '../types'

const EdictProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)

  const { products } = useProductsContext()!
  const { editProductLoading } = useAdminContext()!

  if (editProductLoading) {
    return <FullscreenLoading />
  }
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

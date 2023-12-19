import { useState } from 'react'
import AdminSelect from '../../components/ui/AdminSelect'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useAdminContext } from '../../context/AdminContext'
import EditProductForm from './EditProductForm'

import { useGetAllProducts } from '../../features/products/useGetAllProducts'
import { ProductType } from '../../types'

const EdictProductPage = () => {
  const [value, setValue] = useState<ProductType | null>(null)

  const { data: products } = useGetAllProducts()!
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

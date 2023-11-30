import { useState } from 'react'
import AdminSelect from '../../components/AdminSelect/AdminSelect'
import RemoveProduct from '../../components/RemoveProduct/RemoveProduct'
import { useProductsContext } from '../../context/products_context'
import './RemoveProductPage.css'

const RemoveProductPage = () => {
  const [value, setValue] = useState(undefined)
  const { products } = useProductsContext()!

  return (
    <section className="remove-product-page">
      <h1 className="remove-product-page__title">Remove Product</h1>
      <AdminSelect
        options={products}
        value={value}
        onChange={(option) => setValue(option)}
      />
      {value && <RemoveProduct product={value} />}
    </section>
  )
}
export default RemoveProductPage

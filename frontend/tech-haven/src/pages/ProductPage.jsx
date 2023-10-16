import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'

const ProductPage = () => {
  const { id } = useParams()
  const {
    singleProduct: product,
    singleProductLoading: loading,
    singleProductError: error,
    getSingleProduct,
  } = useProductsContext()
  useEffect(() => {
    getSingleProduct(`http://localhost:3000/api/v1/products/${id}`)
  }, [id])

  console.log(product)

  return <div>ProductPage</div>
}
export default ProductPage

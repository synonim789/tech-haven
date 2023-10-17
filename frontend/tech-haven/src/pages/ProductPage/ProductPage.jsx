import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'

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

  const {
    name,
    description,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
  } = product

  return (
    <div>
      <img src={image} alt={name} />
      <h1>{name}</h1>
      <p>{description}</p>
      <p>{brand}</p>
      <h3>${price}</h3>
      <p>{rating}</p>
      <button>Add To Cart</button>
      <p> - Amount: 1 +</p>
    </div>
  )
}
export default ProductPage

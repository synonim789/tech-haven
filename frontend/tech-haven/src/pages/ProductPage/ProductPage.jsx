import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImageGallery from '../../components/ImageGallery/ImageGallery'
import { useProductsContext } from '../../context/products_context'
import './ProductPage.css'
import { AiFillStar } from 'react-icons/ai'
import AddToCart from '../../components/AddToCart/AddToCart'
const ProductPage = () => {
  const navigate = useNavigate()
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

  if (loading) {
    console.log('Loading')
  }

  if (error) {
    console.log('Error')
  }
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
    <div className="product-page">
      <div className="product-page__left">
        <p onClick={() => navigate(-1)} className="product-page__cta">
          Go Back
        </p>
        <ImageGallery images={images} />
      </div>
      <div className="product-page__right">
        <p className="product-page__rating">
          <AiFillStar />
          {rating}
        </p>
        <h1 className="product-page__title">{name}</h1>
        <p className="product-page__description">{description}</p>
        <p className="product-page__brand">
          <span>Brand: </span>
          {brand}
        </p>
        <p className="product-page__available">
          <span>Available: </span>
          {countInStock > 0 ? 'In Stock' : 'Not in Stock'}
        </p>
        <h3 className="product-page__price">${price}</h3>

        <AddToCart />
      </div>
    </div>
  )
}
export default ProductPage

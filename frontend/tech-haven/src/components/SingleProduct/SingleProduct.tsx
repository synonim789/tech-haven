import { Link } from 'react-router-dom'
import { ProductType } from '../../types'
import './SingleProduct.css'

const SingleProduct = (product: ProductType) => {
  const { image, name, price, id } = product

  return (
    <Link className="single-product" to={`/products/${id}`}>
      <div className="single-product__image-container">
        <img src={image} alt={name} className="single-product__image" />
      </div>
      <div className="single-product__info">
        <p className="single-product__title">{name}</p>
        <p className="single-product__price">${price}</p>
      </div>
    </Link>
  )
}
export default SingleProduct

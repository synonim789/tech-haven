import { BiSearchAlt } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import './SingleProduct.css'

const SingleProduct = (product) => {
  const { image, name, price, id } = product

  return (
    <div className="single-product">
      <div className="single-product__image-container">
        <img src={image} alt={name} className="single-product__image" />
      </div>

      <Link to={`/products/${id}`} className="single-product__cta">
        <BiSearchAlt />
      </Link>
      <p className="single-product__title">{name}</p>
      <p className="single-product__price">${price}</p>
    </div>
  )
}
export default SingleProduct

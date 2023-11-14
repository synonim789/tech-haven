import { Link } from 'react-router-dom'
import './SingleProduct.css'

const SingleProduct = (product) => {
  const { image, name, price, id } = product

  return (
    <Link className="single-product" to={`/products/${id}`}>
      <div className="single-product__image-container">
        <img src={image} alt={name} className="single-product__image" />
      </div>

      {/* <Link to={`/products/${id}`} className="single-product__cta">
        <BiSearchAlt />
      </Link> */}
      <div className="single-product__info">
        <p className="single-product__title">{name}</p>
        <p className="single-product__price">${price}</p>
      </div>
    </Link>
  )
}
export default SingleProduct

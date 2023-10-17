import { Link } from 'react-router-dom'
import './SingleProduct.css'

const SingleProduct = (props) => {
  const { image, name, price, id } = props
  return (
    <div className="single-product">
      <img src={image} alt={name} className="single-product__image" />
      <Link to={`/products/${id}`}>Link</Link>
      <p className="single-product__title">{name}</p>
      <p className="single-product__price">${price}</p>
      <button className="single-product__cta">Add to Cart</button>
    </div>
  )
}
export default SingleProduct

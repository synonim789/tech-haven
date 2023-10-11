import './SingleProduct.css'

const SingleProduct = () => {
  return (
    <div className="single-product">
      <img
        src="https://i.dummyjson.com/data/products/6/thumbnail.png"
        alt=""
        className="single-product__image"
      />
      <p className="single-product__title">MacBook Pro</p>
      <p className="single-product__price">$1749</p>
      <button className="single-product__cta">Add to Cart</button>
    </div>
  )
}
export default SingleProduct

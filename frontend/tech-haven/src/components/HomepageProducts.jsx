import SingleProduct from './SingleProduct'
import './HomepageProducts.css'
import { Link } from 'react-router-dom'
const HomepageProducts = () => {
  return (
    <section className="homepage-products">
      <h2 className="homepage-products__title">Products</h2>
      <div className="homepage-products__products">
        <SingleProduct />
        <SingleProduct />
        <SingleProduct />
      </div>
      <Link to="/products" className="homepage-products__cta">
        All Products
      </Link>
    </section>
  )
}
export default HomepageProducts

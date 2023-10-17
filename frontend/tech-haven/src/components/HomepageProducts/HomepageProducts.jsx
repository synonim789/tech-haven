import SingleProduct from '../SingleProduct/SingleProduct'
import './HomepageProducts.css'
import { Link } from 'react-router-dom'
import { useProductsContext } from '../../context/products_context'

const HomepageProducts = () => {
  const data = useProductsContext()
  const {
    isLoading: loading,
    isError: error,
    featuredProducts: featured,
  } = data
  return (
    <section className="homepage-products">
      <h2 className="homepage-products__title">Products</h2>
      <div className="homepage-products__products">
        {featured.map((product) => {
          return <SingleProduct key={product.id} {...product} />
        })}
      </div>
      <Link to="/products" className="homepage-products__cta">
        All Products
      </Link>
    </section>
  )
}
export default HomepageProducts

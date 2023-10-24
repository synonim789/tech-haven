import Filters from '../../components/Filters/Filters'
import SingleProduct from '../../components/SingleProduct/SingleProduct'
import './ProductsPage.css'
import { BiSearchAlt } from 'react-icons/bi'
import { useFilterContext } from '../../context/filter_context'

const ProductsPage = () => {
  const { filteredProducts: products } = useFilterContext()
  return (
    <section className="products-page">
      <div className="product-page__search-bar">
        <input
          type="text"
          placeholder="Search..."
          className="products-page__search"
        />
        <button className="product-page__search-button">
          <BiSearchAlt />
        </button>
      </div>

      <div className="products-page__content">
        <Filters />
        <div className="products-page__products">
          {products.map((product) => {
            return <SingleProduct key={product.id} {...product} />
          })}
        </div>
      </div>
    </section>
  )
}
export default ProductsPage

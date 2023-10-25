import Filters from '../../components/Filters/Filters'
import SingleProduct from '../../components/SingleProduct/SingleProduct'
import './ProductsPage.css'

import { useFilterContext } from '../../context/filter_context'
import SearchBar from '../../components/SearchBar/SearchBar'
import Sort from '../../components/Sort/Sort'

const ProductsPage = () => {
  const { filteredProducts: products } = useFilterContext()
  return (
    <section className="products-page">
      <SearchBar />
      <Sort />
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

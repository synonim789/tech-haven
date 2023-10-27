import Filters from '../../components/Filters/Filters'
import './ProductsPage.css'
import SearchBar from '../../components/SearchBar/SearchBar'
import Sort from '../../components/Sort/Sort'
import { Pagination } from '../../components/Pagination/Pagination'
import ProductsList from '../../components/ProductsList/ProductsList'

const ProductsPage = () => {
  return (
    <section className="products-page">
      <SearchBar />
      <Sort />
      <div className="products-page__content">
        <Filters />
        <ProductsList />
      </div>
      <Pagination />
    </section>
  )
}
export default ProductsPage

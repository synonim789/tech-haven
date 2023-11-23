import { useEffect } from 'react'
import Filters from '../../components/Filters/Filters'
import { Pagination } from '../../components/Pagination/Pagination'
import ProductsList from '../../components/ProductsList/ProductsList'
import SearchBar from '../../components/SearchBar/SearchBar'
import Sort from '../../components/Sort/Sort'
import { useFilterContext } from '../../context/filter_context'
import './ProductsPage.css'

const ProductsPage = () => {
  const { clearFilters } = useFilterContext()!
  useEffect(() => {
    return function cleanup() {
      clearFilters()
    }
  }, [])
  return (
    <section className="products-page">
      <div className="container">
        <SearchBar />
        <Sort />
        <div className="products-page__content">
          <Filters />
          <ProductsList />
        </div>
        <Pagination />
      </div>
    </section>
  )
}
export default ProductsPage

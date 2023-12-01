import { useEffect } from 'react'
import Filters from '../components/Filters/Filters'
import { Pagination } from '../components/Pagination/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'
import SearchBar from '../components/SearchBar'
import Sort from '../components/Sort/Sort'
import { useFilterContext } from '../context/filter_context'

const ProductsPage = () => {
  const { clearFilters } = useFilterContext()!
  useEffect(() => {
    return function cleanup() {
      clearFilters()
    }
  }, [])
  return (
    <section className="flex flex-col justify-center">
      <div className="max-w-6xl mx-auto">
        <SearchBar />
        <Sort />
        <div className="flex justify-between">
          <Filters />
          <ProductsList />
        </div>
        <Pagination />
      </div>
    </section>
  )
}
export default ProductsPage

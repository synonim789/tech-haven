import { useEffect } from 'react'
import Filters from '../components/Filters'
import { Pagination } from '../components/Pagination'
import ProductsList from '../components/ProductsList/ProductsList'
import SearchBar from '../components/SearchBar'
import Sort from '../components/Sort'
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
        <div className="flex justify-between gap-7">
          <Filters />
          <ProductsList />
        </div>
        <Pagination />
      </div>
    </section>
  )
}
export default ProductsPage

import { useEffect } from 'react'
import Filters from '../components/Filters'
import { Pagination } from '../components/Pagination'
import ProductsList from '../components/ProductsList'
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
      <div className="max-w-5xl mx-auto w-full px-4">
        <SearchBar />
        <Sort />
        <div className="flex gap-7 w-fit">
          <Filters />
          <ProductsList />
        </div>
        <Pagination />
      </div>
    </section>
  )
}
export default ProductsPage

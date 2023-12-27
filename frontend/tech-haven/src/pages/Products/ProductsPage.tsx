import { useEffect } from 'react'
import { useFilterContext } from '../../context/filter_context'
import Filters from './Filters'
import { Pagination } from './Pagination'
import ProductsList from './ProductsList'
import SearchBar from './SearchBar'
import Sort from './Sort'

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

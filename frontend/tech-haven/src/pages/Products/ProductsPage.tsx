import { useEffect } from 'react'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useFilterContext } from '../../context/filter_context'
import { useGetAllProducts } from '../../features/products/useGetAllProducts'
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

  const { data, isLoading } = useGetAllProducts()
  const { getProducts } = useFilterContext()!
  useEffect(() => {
    if (!isLoading) {
      getProducts(data)
    }
  }, [isLoading])

  if (isLoading) {
    return <FullscreenLoading />
  }

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

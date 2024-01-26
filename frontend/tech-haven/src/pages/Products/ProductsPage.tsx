import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import {
  filterProducts,
  getPagination,
  setAllProducts,
  sortProducts,
} from '../../features/products/filters'
import { useGetAllProductsQuery } from '../../features/products/products'
import { RootState } from '../../store'
import Filters from './Filters'
import { Pagination } from './Pagination'
import ProductsList from './ProductsList'
import SearchBar from './SearchBar'
import Sort from './Sort'

const ProductsPage = () => {
  const { data: allProducts, isLoading } = useGetAllProductsQuery()
  const currentPage = useSelector(
    (state: RootState) => state.filters.currentPage
  )
  const filters = useSelector((state: RootState) => state.filters.filters)
  const sort = useSelector((state: RootState) => state.filters.sort)
  const dispatch = useDispatch()

  useEffect(() => {
    if (allProducts) {
      dispatch(setAllProducts(allProducts))
      dispatch(getPagination())
    }
  }, [allProducts])

  useEffect(() => {
    dispatch(filterProducts())
    dispatch(sortProducts())
    dispatch(getPagination())
  }, [currentPage, filters, sort])

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full px-4">
        <SearchBar />
        <Sort />
        <div className="flex gap-7 w-fit flex-col lg:flex-row">
          <Filters allProducts={allProducts} />
          <ProductsList />
        </div>
        <Pagination />
      </div>
    </section>
  )
}
export default ProductsPage

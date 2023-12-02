import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductsList = () => {
  const { pagedProducts: products, listView } = useFilterContext()!

  if (products.length < 1) {
    return <h1>No Products Found</h1>
  }

  if (listView) {
    return <ListView />
  }
  return <GridView />
}
export default ProductsList

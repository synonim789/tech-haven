import { useFilterContext } from '../../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductsList = () => {
  const { pagedProducts: products, listView } = useFilterContext()!

  if (products.length < 1) {
    return <h2 className="text-4xl font-bold">No Products Found </h2>
  }

  if (listView) {
    return <ListView />
  }
  return <GridView />
}
export default ProductsList

import { useSelector } from 'react-redux'
import GridView from './GridView'
import ListView from './ListView'
import { RootState } from '../../store'

const ProductsList = () => {
  const pagedProducts = useSelector((state: RootState) => state.filters.pagedProducts)

  const listView = useSelector((state: RootState) => state.filters.listView)

  if (pagedProducts.length < 1) {
    return <h2 className="text-4xl font-bold">No Products Found </h2>
  }

  if (listView) {
    return <ListView />
  }
  return <GridView pagedProducts={pagedProducts} />
}
export default ProductsList

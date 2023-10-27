import { useFilterContext } from '../../context/filter_context'
import SingleProduct from '../SingleProduct/SingleProduct'
import './GridView.css'

const GridView = () => {
  const { pagedProducts: products } = useFilterContext()

  return (
    <div className="grid-view__products">
      {products.map((product) => {
        return <SingleProduct key={product.id} {...product} />
      })}
    </div>
  )
}
export default GridView

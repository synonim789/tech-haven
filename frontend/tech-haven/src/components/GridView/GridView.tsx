import { useFilterContext } from '../../context/filter_context'
import { ProductType } from '../../types'
import SingleProduct from '../SingleProduct'
import './GridView.css'

const GridView = () => {
  const { pagedProducts: products } = useFilterContext()!

  return (
    <div className="grid-view__products">
      {products.map((product: ProductType) => {
        return <SingleProduct key={product.id} {...product} />
      })}
    </div>
  )
}
export default GridView

import { useFilterContext } from '../context/filter_context'
import { ProductType } from '../types'
import SingleProduct from './SingleProduct'

const GridView = () => {
  const { pagedProducts: products } = useFilterContext()!

  return (
    <div className="grid grid-cols-3 gap-9 text-center h-full">
      {products.map((product: ProductType) => {
        return <SingleProduct key={product.id} {...product} />
      })}
    </div>
  )
}
export default GridView

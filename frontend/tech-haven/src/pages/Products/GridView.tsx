import SingleProduct from '../../components/ui/SingleProduct'
import { useFilterContext } from '../../context/filter_context'
import { ProductType } from '../../types'

const GridView = () => {
  const { pagedProducts: products } = useFilterContext()!

  return (
    <div className="grid grid-cols-1 gap-9 text-center h-full sm:grid-cols-2 md:grid-cols-3">
      {products.map((product: ProductType) => {
        return <SingleProduct key={product.id} {...product} />
      })}
    </div>
  )
}
export default GridView

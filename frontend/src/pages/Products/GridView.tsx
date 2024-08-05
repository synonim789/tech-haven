import SingleProduct from '../../components/ui/SingleProduct'
import { ProductType } from '../../types'

type Props = {
  pagedProducts: ProductType[]
}

const GridView = ({ pagedProducts }: Props) => {
  return (
    <div className="grid h-full grid-cols-1 gap-9 text-center sm:grid-cols-2 md:grid-cols-3">
      {pagedProducts.map((product: ProductType) => {
        return <SingleProduct key={product._id} {...product} />
      })}
    </div>
  )
}
export default GridView

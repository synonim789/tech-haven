import { Link } from 'react-router-dom'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetSingleProductQuery } from '../../features/products/products'
import { formatPrice } from '../../utils/formatPrice'

type Props = {
  id: string
  quantity: number
}

const AdminOrderProduct = ({ id, quantity }: Props) => {
  const { data: product, isLoading } = useGetSingleProductQuery(id)

  if (isLoading) {
    return <FullscreenLoading />
  }

  if (!product) {
    return <h3>Product not found</h3>
  }

  return (
    <Link
      to={`/products/${id}`}
      className="grid md:gap-6 xl:grid-cols-4 place-items-center bg-white rounded-md border border-gray-200 overflow-hidden text-center shadow-md p-3 dark:bg-[#575757] dark:border-none dark:text-slate-400"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-[200px] self-center"
      />
      <span>{product.name}</span>

      <span className="text-slate-400 font-semibold">
        {formatPrice(product.price * quantity)}
      </span>
      <span className="text-slate-400 font-semibold">{quantity}</span>
    </Link>
  )
}
export default AdminOrderProduct

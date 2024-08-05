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
      className="grid place-items-center overflow-hidden rounded-md border border-gray-200 bg-white p-3 text-center shadow-md md:gap-6 xl:grid-cols-4 dark:border-none dark:bg-[#575757] dark:text-slate-400"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-[200px] self-center"
      />
      <span>{product.name}</span>

      <span className="font-semibold text-slate-400">
        {formatPrice(product.price * quantity)}
      </span>
      <span className="font-semibold text-slate-400">{quantity}</span>
    </Link>
  )
}
export default AdminOrderProduct

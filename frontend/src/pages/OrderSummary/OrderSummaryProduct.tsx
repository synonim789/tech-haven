import { cartItem } from '../../features/cart/cart'
import { formatPrice } from '../../utils/formatPrice'

type Props = {
  product: cartItem
}

const OrderSummaryProduct = ({ product }: Props) => {
  return (
    <div className="flex h-full flex-col items-center justify-between gap-7 overflow-hidden rounded-xl bg-white px-6 py-4 text-4xl text-slate-600 shadow-md md:flex-row dark:bg-[#121212]">
      <img
        src={product.image}
        alt={product.name}
        className="w-[250px] rounded-lg"
      />
      <h3 className="w-full max-w-xs text-center">{product.name}</h3>
      <p className="font-bold">{product.amount}</p>
      <p>{formatPrice(product.amount * product.price)}</p>
    </div>
  )
}
export default OrderSummaryProduct

import { cartItem } from '../../features/cart/cart'

type OrderSummaryProductProps = {
  product: cartItem
}

const OrderSummaryProduct = ({ product }: OrderSummaryProductProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden flex flex-col md:flex-row justify-between items-center shadow-md text-4xl px-6 py-4 h-full dark:bg-[#121212] text-slate-600">
      <img
        src={product.image}
        alt={product.name}
        className="w-[250px] rounded-lg"
      />
      <h3 className="max-w-xs text-center w-full">{product.name}</h3>
      <p className="font-bold">{product.amount}</p>
      <p>${product.price}</p>
    </div>
  )
}
export default OrderSummaryProduct

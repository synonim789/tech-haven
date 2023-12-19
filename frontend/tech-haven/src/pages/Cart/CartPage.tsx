import { useCartContext } from '../../context/cart_context'
import CartItem from './CartItem'

const CartPage = () => {
  const { cart, removeAllItemsFromCart, total_amount } = useCartContext()!

  if (cart.length < 1) {
    return (
      <div className="flex justify-center items-center mt-20">
        <h1 className="text-4xl font-bold">No Products Found</h1>
      </div>
    )
  }
  return (
    <div className="my-10 max-w-5xl mx-auto">
      {cart.map((item) => {
        return <CartItem item={item} key={item.name} />
      })}

      <div className="flex justify-between items-end">
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
          onClick={removeAllItemsFromCart}
        >
          Remove All items
        </button>
        <div className="text-right flex flex-col gap-10">
          <h3 className="text-5xl font-semibold">
            Total: <span className="text-[#192b90]">{total_amount}$</span>
          </h3>
          <button className="bg-[#120b90] text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition">
            Continue {'>'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default CartPage

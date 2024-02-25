import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAllItemsFromCart } from '../../features/cart/cart'
import { RootState } from '../../store'
import CartItem from './CartItem'

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  if (cart.length < 1) {
    return (
      <div className="flex justify-center items-center mt-20">
        <h2 className="text-4xl font-bold text-slate-500">No Products Found</h2>
      </div>
    )
  }
  return (
    <section className="my-10 max-w-5xl mx-auto px-5">
      {cart.map((item) => {
        return <CartItem item={item} key={item.name} />
      })}

      <div className="flex justify-between md:items-end flex-col md:flex-row items-center gap-5">
        <button
          className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
          onClick={() => dispatch(removeAllItemsFromCart())}
        >
          Remove All items
        </button>
        <div className="text-right flex flex-col gap-10">
          <h3 className="text-5xl font-semibold dark:text-slate-500">
            Total: <span className="text-[#405684]">{totalPrice}$</span>
          </h3>
          {user ? (
            <Link
              to="/order/info"
              className="bg-[#405684] text-white text-center font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
            >
              Continue {'>'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="bg-[#405684] text-white text-center font-bold px-4 py-2 rounded-lg text-[24px] hover:scale-105 hover:opacity-80 transition"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
export default CartPage

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeAllItemsFromCart } from '../../features/cart/cart'
import { RootState } from '../../store'
import { formatPrice } from '../../utils/formatPrice'
import CartItem from './CartItem'

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.cart)
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.user)

  if (cart.length < 1) {
    return (
      <div className="mt-20 flex items-center justify-center">
        <h2 className="text-4xl font-bold text-slate-500">No Products Found</h2>
      </div>
    )
  }
  return (
    <section className="mx-auto my-10 max-w-5xl px-5">
      {cart.map((item) => {
        return <CartItem item={item} key={item.name} />
      })}

      <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:items-end">
        <button
          className="rounded-lg bg-red-500 px-4 py-2 text-[24px] font-bold text-white transition hover:scale-105 hover:opacity-80"
          onClick={() => dispatch(removeAllItemsFromCart())}
        >
          Remove All items
        </button>
        <div className="flex flex-col gap-10 text-right">
          <h3 className="text-5xl font-semibold dark:text-slate-500">
            Total:{' '}
            <span className="text-[#405684]">{formatPrice(totalPrice)}</span>
          </h3>
          {user ? (
            <Link
              to="/order/info"
              className="rounded-lg bg-[#405684] px-4 py-2 text-center text-[24px] font-bold text-white transition hover:scale-105 hover:opacity-80"
            >
              Continue {'>'}
            </Link>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-[#405684] px-4 py-2 text-center text-[24px] font-bold text-white transition hover:scale-105 hover:opacity-80"
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

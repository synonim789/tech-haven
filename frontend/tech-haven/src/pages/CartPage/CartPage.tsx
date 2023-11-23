import CartItem from '../../components/CartItem/CartItem'
import { useCartContext } from '../../context/cart_context'
import './CartPage.css'

const CartPage = () => {
  const { cart, removeAllItemsFromCart, total_amount } = useCartContext()!

  if (cart.length < 1) {
    return (
      <div className="cart-page__not-found">
        <h1>No Products Found</h1>
      </div>
    )
  }
  return (
    <div className="cart-page">
      {cart.map((item) => {
        return <CartItem item={item} key={item.name} />
      })}

      <div className="cart-page__info">
        <button className="cart-page__cta" onClick={removeAllItemsFromCart}>
          Remove All items
        </button>
        <div className="cart-page__prices">
          <h3 className="cart-page__total">
            Total:{' '}
            <span className="cart-page__total--price">{total_amount}$</span>
          </h3>
          <button className="cart-page__continue">Continue {'>'}</button>
        </div>
      </div>
    </div>
  )
}
export default CartPage

import { BiSolidTrash } from 'react-icons/bi'
import { useCartContext } from '../../context/cart_context'
import AmountButtons from '../AmountButtons/AmountButtons'
import './CartItem.css'
const CartItem = ({ item }) => {
  const { name, image, price, amount, id } = item
  const { removeFromCart, changeAmount } = useCartContext()
  const increase = () => {
    changeAmount(id, 'increase')
  }

  const decrease = () => {
    changeAmount(id, 'decrease')
  }

  return (
    <div key={name} className="cart-item">
      <img src={image} alt={name} className="cart-item__image" />
      <p key={name}>{name}</p>

      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <p className="cart-item__price">${price * amount}</p>
      <BiSolidTrash
        className="cart-item__trash"
        onClick={() => {
          removeFromCart(id)
        }}
      />
    </div>
  )
}
export default CartItem

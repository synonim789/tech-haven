import { BiSolidTrash } from 'react-icons/bi'
import AmountButtons from '../../components/ui/AmountButtons'
import { useCartContext } from '../../context/cart_context'

type CartItemPropsType = {
  item: {
    amount: number
    id: string
    image: string
    max: number
    name: string
    price: number
  }
}

const CartItem = ({ item }: CartItemPropsType) => {
  const { name, image, price, amount, id } = item
  const { removeFromCart, changeAmount } = useCartContext()!
  const increase = () => {
    changeAmount(id, 'increase')
  }

  const decrease = () => {
    changeAmount(id, 'decrease')
  }

  return (
    <div
      key={name}
      className="grid grid-cols-5 gap-5 items-center bg-white mb-10 rounded-xl overflow-hidden text-center shadow-md text-4xl p-5"
    >
      <img src={image} alt={name} />
      <p key={name}>{name}</p>

      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <p className="text-[#192b90] font-semibold">${price * amount}</p>
      <BiSolidTrash
        className="text-4xl text-slate-600 hover:text-black cursor-pointer transition-all hover:scale-105"
        onClick={() => {
          removeFromCart(id)
        }}
      />
    </div>
  )
}
export default CartItem

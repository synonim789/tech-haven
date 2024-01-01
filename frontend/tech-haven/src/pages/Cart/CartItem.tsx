import { BiSolidTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import AmountButtons from '../../components/ui/AmountButtons'
import { changeAmount, removeItemFromCart } from '../../features/cart/cart'

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
  const dispatch = useDispatch()
  const increase = () => {
    dispatch(changeAmount({ id: id, value: 'increase' }))
  }

  const decrease = () => {
    dispatch(changeAmount({ id: id, value: 'decrease' }))
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
          dispatch(removeItemFromCart(id))
        }}
      />
    </div>
  )
}
export default CartItem

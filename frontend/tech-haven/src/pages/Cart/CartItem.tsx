import { BiSolidTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import AmountButtons from '../../components/ui/AmountButtons'
import { changeAmount, removeItemFromCart } from '../../features/cart/cart'
import { formatPrice } from '../../utils/formatPrice'

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
      className="grid gap-6 xl:grid-cols-5 place-items-center bg-white mb-10 rounded-md border border-gray-200 overflow-hidden text-center shadow-md text-4xl p-5 dark:bg-[#575757] dark:border-none dark:text-slate-400"
    >
      <img src={image} alt={name} className="w-4/5" />
      <p key={name}>{name}</p>

      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <p className="text-slate-400 font-semibold">
        {formatPrice(price * amount)}
      </p>

      <BiSolidTrash
        className="text-4xl text-slate-600 hover:text-red-500 cursor-pointer transition-all hover:scale-105 dark:text-slate-400"
        onClick={() => {
          dispatch(removeItemFromCart(id))
        }}
      />
    </div>
  )
}
export default CartItem

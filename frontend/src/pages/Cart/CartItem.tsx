import { BiSolidTrash } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import AmountButtons from '../../components/ui/AmountButtons'
import { changeAmount, removeItemFromCart } from '../../features/cart/cart'
import { formatPrice } from '../../utils/formatPrice'

type Props = {
  item: {
    amount: number
    id: string
    image: string
    max: number
    name: string
    price: number
  }
}

const CartItem = ({ item }: Props) => {
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
      className="mb-10 grid place-items-center gap-6 overflow-hidden rounded-md border border-gray-200 bg-white p-5 text-center text-4xl shadow-md xl:grid-cols-5 dark:border-none dark:bg-[#222427] dark:text-slate-600"
    >
      <img src={image} alt={name} className="w-4/5" />
      <p key={name}>{name}</p>

      <AmountButtons amount={amount} increase={increase} decrease={decrease} />
      <p className="  font-semibold">{formatPrice(price * amount)}</p>

      <BiSolidTrash
        className="cursor-pointer text-4xl text-slate-600 transition-all hover:scale-105 hover:text-red-500 dark:text-slate-400"
        onClick={() => {
          dispatch(removeItemFromCart(id))
        }}
      />
    </div>
  )
}
export default CartItem

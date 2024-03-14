import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatPrice'

type Props = {
  image: string
  name: string
  price: number
  quantity: number
  id: string
}

const SingleOrderProduct = ({ image, name, price, quantity, id }: Props) => {
  return (
    <Link
      to={`/products/${id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden p-3 flex justify-between flex-col md:flex-row items-center dark:bg-[#121212] dark:text-slate-400"
    >
      <img src={image} alt="" className="h-20" />
      <p className="text-lg">{name}</p>
      <p className="text-lg">{quantity}</p>
      <p className="text-lg font-bold">{formatPrice(price * quantity)}</p>
    </Link>
  )
}
export default SingleOrderProduct

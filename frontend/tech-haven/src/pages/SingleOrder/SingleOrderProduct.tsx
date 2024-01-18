import { Link } from 'react-router-dom'

type SingleOrderProductProps = {
  image: string
  name: string
  price: number
  quantity: number
  id: string
}

const SingleOrderProduct = ({
  image,
  name,
  price,
  quantity,
  id,
}: SingleOrderProductProps) => {
  return (
    <Link
      to={`/products/${id}`}
      className="bg-white shadow-md rounded-lg overflow-hidden p-3 flex justify-between flex-col md:flex-row items-center"
    >
      <img src={image} alt="" className="h-20" />
      <p className="text-lg">{name}</p>
      <p className="text-lg">{quantity}</p>
      <p className="text-lg font-bold">${price}</p>
    </Link>
  )
}
export default SingleOrderProduct

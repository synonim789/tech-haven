import { Link } from 'react-router-dom'
import { ProductType } from '../../types'
import { formatPrice } from '../../utils/formatPrice'

const SingleProduct = (product: ProductType) => {
  const { image, name, price, _id: id } = product

  return (
    <Link
      className="flex flex-col overflow-hidden rounded-md bg-white shadow-2xl duration-300 hover:scale-110 dark:bg-[#121212]"
      to={`/products/${id}`}
    >
      <img src={image} alt={name} className="size-full object-cover" />
      <div className="flex flex-col justify-center px-4 py-3 text-left">
        <p className="my-5 truncate text-3xl font-semibold text-[#405684]">
          {name}
        </p>
        <p className="mb-5 text-3xl font-bold text-orange-500">
          {formatPrice(price)}
        </p>
      </div>
    </Link>
  )
}
export default SingleProduct

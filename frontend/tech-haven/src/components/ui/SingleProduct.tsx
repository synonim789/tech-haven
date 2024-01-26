import { Link } from 'react-router-dom'
import { ProductType } from '../../types'

const SingleProduct = (product: ProductType) => {
  const { image, name, price, id } = product

  return (
    <Link
      className="bg-white dark:bg-[#121212] rounded-md overflow-hidden hover:scale-110 duration-300 flex flex-col shadow-2xl"
      to={`/products/${id}`}
    >
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="px-4 py-3 text-left flex flex-col justify-center">
        <p className="text-[#405684] font-semibold text-3xl mt-5 mb-5 truncate">
          {name}
        </p>
        <p className="text-orange-500 font-bold text-3xl mb-5">${price}</p>
      </div>
    </Link>
  )
}
export default SingleProduct

import { Link } from 'react-router-dom'
import { ProductType } from '../types'

const SingleProduct = (product: ProductType) => {
  const { image, name, price, id } = product

  return (
    <Link
      className="bg-white rounded-3xl overflow-hidden hover:scale-110 duration-300 flex flex-col shadow-sm"
      to={`/products/${id}`}
    >
      <img src={image} alt={name} className="aspect-[4/3] object-cover" />
      <p className="text-[#120b90] font-semibold text-3xl mt-5 mb-5">{name}</p>
      <p className="text-orange-500 font-bold text-3xl mb-5">${price}</p>
    </Link>
  )
}
export default SingleProduct

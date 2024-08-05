import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../store'
import { formatPrice } from '../../utils/formatPrice'

const ListView = () => {
  const pagedProducts = useSelector(
    (state: RootState) => state.filters.pagedProducts
  )

  return (
    <div className="flex flex-col gap-10">
      {pagedProducts.map((product, index) => {
        return (
          <div
            className="rounded-xl bg-white shadow-md transition hover:scale-105 dark:bg-[#121212]"
            key={index}
          >
            <h2 className="ml-5 mt-5 text-3xl font-bold text-[#405684]">
              {product.name}
            </h2>
            <div className="flex items-center justify-between pb-5 pl-3 text-right">
              <img
                src={product.image}
                className=" h-100% w-[200px] overflow-hidden rounded-lg object-cover"
              />

              <div className="mx-5 flex flex-col gap-5">
                <h5 className="text-2xl font-bold text-[#405684]">
                  {formatPrice(product.price)}
                </h5>
                <p className="text-slate-600">
                  {product.description.substring(0, 125)}...
                </p>
                <Link
                  to={`/products/${product._id}`}
                  className="block w-fit rounded-xl bg-[#405684] px-4 py-2 text-2xl font-bold text-white"
                >
                  Go To Product
                </Link>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default ListView

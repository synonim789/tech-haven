import { Link } from 'react-router-dom'
import { useFilterContext } from '../../context/filter_context'

const ListView = () => {
  const { pagedProducts: products } = useFilterContext()!

  return (
    <div className="flex flex-col gap-10">
      {products.map((product, index) => {
        return (
          <div
            className="bg-white rounded-xl shadow-md hover:scale-105 transition"
            key={index}
          >
            <h2 className="mt-5 text-3xl ml-5 text-[#120b90] font-bold">
              {product.name}
            </h2>
            <div className="flex items-center justify-between text-right pb-5 pl-3">
              <img
                src={product.image}
                className=" overflow-hidden rounded-lg object-cover w-[200px] h-100%"
              />

              <div className="mx-5 flex flex-col gap-5">
                <h5 className="text-2xl text-[#120b90] font-bold">
                  ${product.price}
                </h5>
                <p className="">{product.description.substring(0, 125)}...</p>
                <Link
                  to={`/products/${product.id}`}
                  className="bg-[#120b90] text-white w-fit font-bold text-2xl py-2 px-4 rounded-xl block"
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

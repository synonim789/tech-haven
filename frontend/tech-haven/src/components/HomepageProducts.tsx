import { Link } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import SingleProduct from './SingleProduct'

const HomepageProducts = () => {
  const data = useProductsContext()!

  const { featuredProducts: featured } = data

  return (
    <section className="pt-10 text-center mb-12 px-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-16 ">
        <h2 className="text-5xl font-semibold text-[#120b90] relative after:content-[''] after:absolute after:h-2 after:w-4/5 after:bg-orange-500 after:left-0 after:-bottom-3 after:right-0 after:mx-auto">
          Products
        </h2>
        <div className="flex flex-col sm:flex-row gap-10">
          {featured.map((product) => {
            return <SingleProduct key={product.id} {...product} />
          })}
        </div>
        <Link
          to="/products"
          className="text-[#120b90] bg-white px-12 py-6 font-semibold text-4xl rounded-full hover:scale-110 transition duration-300 shadow-sm"
        >
          All Products
        </Link>
      </div>
    </section>
  )
}
export default HomepageProducts

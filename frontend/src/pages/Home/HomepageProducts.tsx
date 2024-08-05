import { Link } from 'react-router-dom'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import SingleProduct from '../../components/ui/SingleProduct'
import { useGetFeaturedProductsQuery } from '../../features/featuredProducts/featuredProducts'

const HomepageProducts = () => {
  const { data: featuredProducts, isLoading } = useGetFeaturedProductsQuery()

  if (isLoading) {
    return <FullscreenLoading />
  }

  return (
    <section className="mb-12 px-4 pt-10 text-center">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center gap-16 px-4 ">
        <h2 className="relative text-5xl font-semibold text-[#405684] after:absolute after:inset-x-0 after:-bottom-3 after:mx-auto after:h-2 after:w-4/5 after:bg-orange-500 after:content-['']">
          Products
        </h2>
        <div className="flex flex-col gap-10 sm:flex-row">
          {featuredProducts?.map((product) => {
            return <SingleProduct key={product._id} {...product} />
          })}
        </div>
        <Link
          to="/products"
          className="rounded-full bg-white px-6 py-3 text-4xl font-semibold text-[#405684] shadow-xl transition duration-300 hover:scale-110 sm:px-12 sm:py-6 dark:bg-[#121212]"
        >
          All Products
        </Link>
      </div>
    </section>
  )
}
export default HomepageProducts

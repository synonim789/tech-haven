import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetSingleProductQuery } from '../../features/products/products'
import AddToCart from './AddToCart'
import ImageGallery from './ImageGallery'

const ProductPage = () => {
  const { id } = useParams()
  const { data: product, isLoading, isError } = useGetSingleProductQuery(id)
  if (isLoading) {
    return <FullscreenLoading />
  }

  if (isError || !product) {
    return (
      <h2 className="min-h-[80vh] flex items-center justify-center text-6xl dark:text-slate-500 font-bold">
        Product not Found
      </h2>
    )
  }
  const { name, description, images, brand, price, countInStock, rating } =
    product

  return (
    <main className="max-w-screen-xl mx-auto w-full flex flex-col justify-between gap-16 mt-10 mb-20 px-5">
      <div className="flex flex-col lg:flex-row gap-7 lg:gap-0">
        <ImageGallery images={images} />

        <section className="flex flex-col gap-4 justify-between">
          <p className="text-2xl flex items-center text-slate-400">
            <AiFillStar className="text-yellow-500" />
            {rating}
          </p>
          <h2 className="text-6xl font-bold text-slate-500 max-w-sm ">
            {name}
          </h2>
          {/* <p className="text-[25px] text-slate-600 font-semibold">
          {description}
        </p> */}
          <p className="text-[25px] text-slate-500">
            <span className="font-bold ">Brand: </span>
            {brand}
          </p>
          <p className="text-[25px] text-slate-500">
            <span className="font-bold">Available: </span>
            {countInStock > 0 ? 'In Stock' : 'Not in Stock'}
          </p>
          <h3 className="text-[#405684] text-6xl mb-8 font-bold">${price}</h3>
          <AddToCart product={product} />
        </section>
      </div>

      <section className="flex flex-col gap-y-10">
        <h3 className="text-slate-300 text-4xl font-bold">Description</h3>
        <p className="text-2xl max-w-3xl text-slate-500">{description}</p>
      </section>
    </main>
  )
}
export default ProductPage

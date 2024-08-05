import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetSingleProductQuery } from '../../features/products/products'
import { formatPrice } from '../../utils/formatPrice'
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
      <h2 className="flex min-h-[80vh] items-center justify-center text-6xl font-bold dark:text-slate-500">
        Product not Found
      </h2>
    )
  }
  const { name, description, images, brand, price, countInStock, rating } =
    product

  return (
    <main className="mx-auto mb-20 mt-10 flex w-full max-w-screen-xl flex-col justify-between gap-16 px-5">
      <div className="flex flex-col gap-7 lg:flex-row lg:gap-0">
        <ImageGallery images={images} />
        <section className="flex flex-col justify-between gap-4">
          <p className="flex items-center text-2xl text-slate-400">
            <AiFillStar className="text-yellow-500" />
            {rating}
          </p>
          <h2 className="max-w-sm text-6xl font-bold text-slate-500 ">
            {name}
          </h2>
          <p className="text-[25px] text-slate-500">
            <span className="font-bold ">Brand: </span>
            {brand}
          </p>
          <p className="text-[25px] text-slate-500">
            <span className="font-bold">Available: </span>
            {countInStock > 0 ? 'In Stock' : 'Not in Stock'}
          </p>
          <h3 className="mb-8 text-6xl font-bold text-[#405684]">
            {formatPrice(price)}
          </h3>
          <AddToCart product={product} />
        </section>
      </div>

      <section className="flex flex-col gap-y-10">
        <h3 className="text-4xl font-bold text-slate-300">Description</h3>
        <p className="max-w-3xl text-2xl text-slate-500">{description}</p>
      </section>
    </main>
  )
}
export default ProductPage

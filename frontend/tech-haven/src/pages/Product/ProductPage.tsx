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
      <h2 className="min-h-[80vh] flex items-center justify-center text-6xl">
        Product not Found
      </h2>
    )
  }
  const { name, description, images, brand, price, countInStock, rating } =
    product

  return (
    <div className="max-w-6xl mx-auto flex  flex-col justify-between lg:flex-row gap-16 mt-10 mb-20 h-full px-4">
      <ImageGallery images={images} />

      <section className="flex flex-col gap-4 lg:w-2/4">
        <p className="text-2xl flex items-center text-slate-400">
          <AiFillStar className="text-yellow-500" />
          {rating}
        </p>
        <h2 className="text-6xl font-bold text-slate-500">{name}</h2>
        <p className="text-[25px] text-slate-600 font-semibold">
          {description}
        </p>
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
  )
}
export default ProductPage

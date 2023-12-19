import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import FullscreenLoading from '../../components/ui/FullscreenLoading'
import { useGetSingleProduct } from '../../features/products/useGetSingleProduct'
import AddToCart from './AddToCart'
import ImageGallery from './ImageGallery'

const ProductPage = () => {
  const { id } = useParams<{ id: string }>()

  const { data: product, isLoading, isError } = useGetSingleProduct(id)!

  if (isLoading) {
    return <FullscreenLoading />
  }

  if (isError) {
    return (
      <h1 className="min-h-[80vh] flex items-center justify-center text-6xl">
        Product not Found
      </h1>
    )
  }

  console.log(product)

  const { name, description, images, brand, price, countInStock, rating } =
    product

  return (
    <div className="max-w-6xl mx-auto flex  flex-col justify-between lg:flex-row gap-16 mt-10 mb-20 h-full">
      <ImageGallery images={images} />

      <section className="flex flex-col gap-4 lg:w-2/4">
        <p className="text-2xl flex items-center">
          <AiFillStar className="text-yellow-500" />
          {rating}
        </p>
        <h1 className="text-6xl font-bold">{name}</h1>
        <p className="text-[25px]">{description}</p>
        <p className="text-[25px]">
          <span className="font-bold ">Brand: </span>
          {brand}
        </p>
        <p className="text-[25px]">
          <span className="font-bold">Available: </span>
          {countInStock > 0 ? 'In Stock' : 'Not in Stock'}
        </p>
        <h3 className="text-[#120b90] text-6xl mb-8 font-bold">${price}</h3>
        <AddToCart product={product} />
      </section>
    </div>
  )
}
export default ProductPage

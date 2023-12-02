import { useEffect } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import AddToCart from '../components/AddToCart'
import FullscreenLoading from '../components/FullscreenLoading'
import ImageGallery from '../components/ImageGallery'
import { useProductsContext } from '../context/products_context'

const ProductPage = () => {
  const { id } = useParams()

  const {
    singleProduct: product,
    singleProductLoading: loading,
    singleProductError: error,
    getSingleProduct,
    clearSingleProduct,
  } = useProductsContext()!

  useEffect(() => {
    getSingleProduct(`http://localhost:3000/api/v1/products/${id}`)
    return function cleanup() {
      clearSingleProduct()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (loading) {
    return <FullscreenLoading />
  }

  if (error) {
    return (
      <h1 className="min-h-[80vh] flex items-center justify-center text-6xl">
        Product not Found
      </h1>
    )
  }
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

import { useEffect, useRef, useState } from 'react'
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'

const ImageGallery = ({ images = [''] }) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [lastIndex, setLastIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLastIndex(images.length - 1)
  }, [images])

  const nextImage = () => {
    setImageIndex((prevIndex) => prevIndex + 1)
    handleOverflow('right')
  }

  const prevImage = () => {
    setImageIndex((prevIndex) => prevIndex - 1)
    handleOverflow('left')
  }

  const setImage = (url: string) => {
    const newMainImage = images.findIndex((element) => element === url)
    setImageIndex(newMainImage)
    if (newMainImage > imageIndex) {
      handleOverflow('right')
    } else {
      handleOverflow('left')
    }
  }

  const handleOverflow = (direction: 'left' | 'right') => {
    const container = containerRef.current
    const scrollAmount = 100
    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount
      } else if (direction === 'right') {
        container.scrollLeft += scrollAmount
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 lg:w-2/4">
      <div className="relative">
        <img
          src={images[imageIndex]}
          className="aspect-square h-[400px] w-auto overflow-hidden rounded-xl object-cover"
        />
        {!(lastIndex === imageIndex) && (
          <button
            onClick={() => nextImage()}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 dark:bg-[#121212]"
          >
            <BiChevronRight size={30} className="dark:text-slate-400" />
          </button>
        )}

        {imageIndex > 0 && (
          <button
            onClick={() => prevImage()}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-1 dark:bg-[#121212]"
          >
            <BiChevronLeft size={30} className="dark:text-slate-400" />
          </button>
        )}
      </div>
      <div
        className="flex max-w-[400px] gap-5 overflow-hidden transition-all duration-500"
        ref={containerRef}
      >
        {images.map((image, index) => {
          return (
            <img
              src={image}
              className="aspect-square h-[100px] w-auto cursor-pointer rounded-lg object-cover"
              key={index}
              onClick={() => setImage(image)}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ImageGallery

import { useEffect, useState } from 'react'

const ImageGallery = ({ images = [''] }) => {
  const [main, setMain] = useState(images[0])
  useEffect(() => {
    setMain(images[0])
  }, [images])

  return (
    <div className="flex flex-col justify-center items-center gap-6 lg:w-2/4">
      <img
        src={main}
        className="w-auto h-[400px] aspect-square object-cover rounded-xl overflow-hidden"
      />

      <div className="flex gap-3 flex-row justify-between h-24">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt=""
              key={index}
              onClick={() => setMain(images[index])}
              className={
                'w-32 h-32 rounded-md cursor-pointer object-cover hover:scale-110 ' +
                (image === main ? 'opacity-30' : '')
              }
            />
          )
        })}
      </div>
    </div>
  )
}
export default ImageGallery

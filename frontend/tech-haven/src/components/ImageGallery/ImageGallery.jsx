import { useEffect, useState } from 'react'
import './ImageGallery.css'

const ImageGallery = (images = ['']) => {
  const [main, setMain] = useState(images[0])

  useEffect(() => {
    setMain(images[0])
  }, [images])

  return (
    <div className="image-gallery">
      <div className="image-gallery__main">
        <img src={main} alt="" />
      </div>
      <div className="image-gallery__gallery">
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt=""
              key={index}
              onClick={() => setMain(images[index])}
              className={image === main ? 'image-gallery__active' : ''}
            />
          )
        })}
      </div>
    </div>
  )
}
export default ImageGallery

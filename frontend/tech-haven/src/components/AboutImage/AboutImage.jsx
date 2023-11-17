import { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'
import './AboutImage.css'

const AboutImage = ({ src }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setImageLoaded(true)
    }
    img.src = src
  }, [src])
  return (
    <>
      {!imageLoaded && (
        <Blurhash
          hash=",TMQ^#jvRkaxM{~pj?M{ofRj02Rjj]RjoeIUt8WAtRtR%LRP%MWBRjogt8RPRjayITaxWEt7t7%gRjt7ayRP"
          width="400px"
          height="645px"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="about__blurred--image"
        />
      )}
      {imageLoaded && <img src={src} alt="" className="about-image" />}
    </>
  )
}
export default AboutImage

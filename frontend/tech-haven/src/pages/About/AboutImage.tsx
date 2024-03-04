import { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'

type AboutImagePropType = {
  src: string
}

const AboutImage = ({ src }: AboutImagePropType) => {
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
          className="rounded-xl overflow-hidden"
        />
      )}
      {imageLoaded && (
        <img
          src={src}
          alt=""
          className="rounded-xl w-[400px] h-[645px] overflow-hidden animate-pulse"
        />
      )}
    </>
  )
}
export default AboutImage

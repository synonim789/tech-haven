import { useEffect, useState } from 'react'
import { Blurhash } from 'react-blurhash'

type Props = {
  src: string
}

const AboutImage = ({ src }: Props) => {
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
          width="350px"
          height="553px"
          resolutionX={32}
          resolutionY={32}
          punch={1}
          className="rounded-xl overflow-hidden"
        />
      )}
      {imageLoaded && (
        <img
          src={src}
          alt="laptop on the accessories on the desk"
          className="rounded-xl w-[350px] overflow-hidden animate-pulse"
        />
      )}
    </>
  )
}
export default AboutImage

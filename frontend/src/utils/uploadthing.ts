import { generateReactHelpers } from '@uploadthing/react'
import { FileRoute } from 'uploadthing/types'
import { serverUrl } from '../api/api'

type OurFileRouter = {
  imageUploader: FileRoute<{
    input: undefined
    output: null
    errorShape: object
  }>
}

const { uploadFiles } = generateReactHelpers<OurFileRouter>({
  url: `${serverUrl}/uploadthing`,
})

export const uploadProductImages = async (image: File, images: File[]) => {
  const allFiles = [image, ...images]
  const uploaded = await uploadFiles('imageUploader', {
    files: allFiles,
  })

  return {
    mainImageUrl: uploaded[0].ufsUrl,
    galleryUrls: uploaded.slice(1).map((f) => f.ufsUrl),
  }
}

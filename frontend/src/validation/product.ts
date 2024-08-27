import { z } from 'zod'

export const addProductSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(20, 'Required'),
  brand: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  isFeatured: z.boolean().optional(),
  price: z.coerce.number().min(1, 'Must be at least 1'),
  countInStock: z.coerce.number().min(1, 'Must be a t least 1'),
  rating: z.coerce
    .number()
    .min(1, 'Must be at least 1')
    .max(5, 'Max rating is 5'),
  numReviews: z.coerce.number().min(1, 'Must be at least 1'),
  image: z.instanceof(FileList).refine((files) => {
    console.log(files)
    return files.length === 1
  }, 'Required'),
  images: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'Required'),
})

export type AddProductValues = z.infer<typeof addProductSchema>

export const editProductSchema = z.object({
  name: z.string().min(1, 'Required'),
  description: z.string().min(20, 'Required'),
  brand: z.string().min(1, 'Required'),
  category: z.string().min(1, 'Required'),
  isFeatured: z.boolean().optional(),
  price: z.coerce.number().min(1, 'Must be at least 1'),
  countInStock: z.coerce.number().min(1, 'Must be a t least 1'),
  rating: z.coerce
    .number()
    .min(1, 'Must be at least 1')
    .max(5, 'Max rating is 5'),
  numReviews: z.coerce.number().min(1, 'Must be at least 1'),
})

export type EditProductValues = z.infer<typeof editProductSchema>

import { z } from 'zod'

export const addCategorySchema = z.object({
  category: z.string().min(1, 'Required'),
})

export type AddCategoryValues = z.infer<typeof addCategorySchema>

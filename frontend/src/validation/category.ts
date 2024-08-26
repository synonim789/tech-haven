import { z } from 'zod'

export const addCategorySchema = z.object({
  name: z.string().min(1, 'Required'),
})

export type AddCategoryValues = z.infer<typeof addCategorySchema>

export const editCategorySchema = z.object({
  name: z.string().min(1, 'Required'),
})

export type EditCategoryValues = z.infer<typeof editCategorySchema>

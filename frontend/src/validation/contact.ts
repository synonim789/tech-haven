import { z } from 'zod'

export const contactSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  name: z.string().min(2, 'Required'),
  message: z.string().min(10, 'Required'),
})

export type ContactValues = z.infer<typeof contactSchema>

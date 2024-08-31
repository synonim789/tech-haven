import { z } from 'zod'

export const editUserSchema = z.object({
  name: z.string().min(1, 'Required'),
  email: z.string().min(1, 'Required').email('Invalid email'),
  phone: z.string().min(1, 'Required'),
  street: z.string().min(1, 'Required'),
  apartment: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  zip: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
})

export type EditUserValues = z.infer<typeof editUserSchema>

import { z } from 'zod'

export const orderInfoSchema = z.object({
  name: z.string().min(1, 'Required'),
  city: z.string().min(1, 'Required'),
  country: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  street: z.string().min(1, 'Required'),
  apartment: z.string().min(1, 'Required'),
  payment: z.enum(['stripe', 'cod']),
  zip: z.string().min(1, 'Required'),
})

export type OrderInfoValues = z.infer<typeof orderInfoSchema>

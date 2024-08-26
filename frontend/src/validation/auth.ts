import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  password: z.string().min(1, 'Required'),
})

export type LoginValues = z.infer<typeof loginSchema>

export const signUpSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email'),
  name: z.string().min(3, 'Required'),
  password: z.string().min(1, 'Required'),
})

export type SignUpValues = z.infer<typeof signUpSchema>

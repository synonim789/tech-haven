import { z } from "zod";

export const AddUserSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string().optional(),
    role: z.string().optional(),
    street: z.string().optional(),
    apartment: z.string().optional(),
    city: z.string().optional(),
    zip: z.string().optional(),
    country: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.name || !data.email || !data.password) {
        return false;
      }
      return true;
    },
    { message: "Parameters missing" },
  );

export const LoginSchema = z
  .object({
    email: z.string().email().min(1),
    password: z.string().min(1),
  })
  .refine(
    (data) => {
      if (!data.email || !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password or email is missing",
    },
  );

export const SignUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
    name: z.string(),
  })
  .refine(
    (data) => {
      if (!data.email || !data.password || !data.email) {
        return false;
      }
      return true;
    },
    {
      message: "Missing parameters",
    },
  );

export const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const UpdateUserSchema = z.object({
  name: z.string(),
  phone: z.string(),
  street: z.string(),
  apartment: z.string(),
  city: z.string(),
  zip: z.string(),
  country: z.string(),
});

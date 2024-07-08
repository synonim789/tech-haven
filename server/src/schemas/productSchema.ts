import { z } from "zod";

export const AddProductSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    price: z.number(),
    brand: z.string(),
    countInStock: z.number(),
    rating: z.number(),
    numReviews: z.number(),
    isFeatured: z.boolean(),
  })
  .refine(
    (data) => {
      if (
        !data.name ||
        !data.description ||
        !data.price ||
        !data.brand ||
        !data.category ||
        !data.countInStock ||
        !data.rating ||
        !data.numReviews ||
        !data.isFeatured
      ) {
        return false;
      }
      return true;
    },
    {
      message: "All fields must be filled",
    },
  );

export const updateProductSchema = z
  .object({
    name: z.string(),
    category: z.string(),
    description: z.string(),
    price: z.number(),
    brand: z.string(),
    countInStock: z.number(),
    rating: z.number(),
    numReviews: z.number(),
    isFeatured: z.boolean(),
  })
  .refine(
    (data) => {
      if (
        !data.name ||
        !data.description ||
        !data.price ||
        !data.brand ||
        !data.category ||
        !data.countInStock ||
        !data.rating ||
        !data.numReviews ||
        !data.isFeatured
      ) {
        return false;
      }
      return true;
    },
    {
      message: "All fields must be filled",
    },
  );

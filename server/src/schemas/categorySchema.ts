import { z } from "zod";

export const addCategorySchema = z.object({
  name: z.string().min(1, { message: "name field is required" }),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, { message: "name field is required" }),
});

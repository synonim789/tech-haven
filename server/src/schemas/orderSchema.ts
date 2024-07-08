import { z } from "zod";

export const updateOrderSchema = z.object({
  status: z
    .enum([
      "pending",
      "paid",
      "inProgress",
      "inDelivery",
      "delivered",
      "canceled",
    ])
    .refine((_) => true, {
      message:
        "Invalid status value. Allowed values are: pending, paid, inProgress, inDelivery, delivered, canceled.",
    }),
});

const ProductSchema = z.object({
  quantity: z.number(),
  price: z.number(),
  name: z.string(),
  productId: z.string(),
});

const OrderSchema = z
  .object({
    products: z.array(ProductSchema),
    shippingAddress1: z.string(),
    shippingAddress2: z.string(),
    phone: z.string(),
    total: z.number(),
    subtotal: z.number(),
    userId: z.string(),
  })
  .refine(
    (data) => {
      if (
        !data.products ||
        !data.shippingAddress1 ||
        !data.phone ||
        !data.userId ||
        !data.subtotal ||
        !data.total
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Incomplete order data",
    },
  );

export const AddOrderSchema = z.object({
  order: OrderSchema,
});

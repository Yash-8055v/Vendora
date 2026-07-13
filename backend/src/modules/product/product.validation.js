import { z } from "zod";

export const createProductValidation = z.object({
  categoryId: z.string().trim(),

  name: z
    .string()
    .trim()
    .min(3)
    .max(200),

  description: z
    .string()
    .trim()
    .min(10)
    .max(5000),

  price: z
    .number()
    .nonnegative(),

  compareAtPrice: z
    .number()
    .nonnegative()
    .optional(),

  stock: z
    .number()
    .int()
    .nonnegative(),

  images: z
    .array(z.string().url())
    .optional(),
});

export const updateProductValidation =
  createProductValidation.partial();
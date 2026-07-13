import { z } from "zod";

export const createOrderValidation = z.object({
  addressId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Invalid address id"
    ),

  paymentMethod: z.enum([
    "cod",
    "online",
  ]),
});

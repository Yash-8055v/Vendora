import { z } from "zod";

export const createAddressValidation = z.object({
  fullName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  addressLine1: z
    .string()
    .trim()
    .min(5)
    .max(200),

  addressLine2: z
    .string()
    .trim()
    .max(200)
    .optional(),

  city: z
    .string()
    .trim()
    .min(2)
    .max(100),

  state: z
    .string()
    .trim()
    .min(2)
    .max(100),

  country: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .optional(),

  postalCode: z
    .string()
    .regex(/^[0-9]{6}$/, "Postal code must be 6 digits"),

  isDefault: z
    .boolean()
    .optional(),
});

export const updateAddressValidation =
  createAddressValidation.partial();
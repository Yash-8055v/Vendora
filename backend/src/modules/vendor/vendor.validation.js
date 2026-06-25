import { z } from "zod";

export const applyVendorValidation = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name cannot exceed 100 characters"),

  businessType: z.enum(["individual", "company"], {
    errorMap: () => ({
      message: "Business type must be individual or company",
    }),
  }),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  gstNumber: z
    .string()
    .trim()
    .toUpperCase()
    .optional(),

  address: z
    .string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(300, "Address cannot exceed 300 characters"),

  reasonForSelling: z
    .string()
    .trim()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason cannot exceed 500 characters"),
});
import { z } from "zod";

export const createStoreValidation = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Store name must be at least 3 characters")
    .max(100, "Store name cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters"),

  logo: z
    .string()
    .url("Logo must be a valid URL")
    .optional(),

  banner: z
    .string()
    .url("Banner must be a valid URL")
    .optional(),
});

export const updateStoreValidation = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Store name must be at least 3 characters")
    .max(100, "Store name cannot exceed 100 characters")
    .optional(),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
  logo: z
    .string()
    .url("Logo must be a valid URL")
    .optional(),
  banner: z
    .string()
    .url("Banner must be a valid URL")
    .optional(),
}); 
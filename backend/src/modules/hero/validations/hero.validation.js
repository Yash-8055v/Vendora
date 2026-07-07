import { z } from "zod";

const ctaTypes = [
  "product",
  "category",
  "store",
  "external",
];

export const createHeroValidation = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(100, "Title cannot exceed 100 characters"),

    subtitle: z
      .string()
      .trim()
      .max(150, "Subtitle cannot exceed 150 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(500, "Description cannot exceed 500 characters")
      .optional(),

    cta: z
      .object({
        text: z
          .string()
          .trim()
          .max(30, "Button text cannot exceed 30 characters")
          .optional(),

        type: z
          .enum(ctaTypes)
          .optional(),

        value: z
          .string()
          .trim()
          .optional(),
      })
      .optional(),

    order: z.coerce
      .number()
      .int()
      .min(1, "Order must be at least 1"),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;

      return data.endDate > data.startDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export const updateHeroValidation = z
  .object({
    title: z
      .string()
      .trim()
      .min(1)
      .max(100)
      .optional(),

    subtitle: z
      .string()
      .trim()
      .max(150)
      .optional(),

    description: z
      .string()
      .trim()
      .max(500)
      .optional(),

    cta: z
      .object({
        text: z.string().trim().max(30).optional(),

        type: z.enum(ctaTypes).optional(),

        value: z.string().trim().optional(),
      })
      .optional(),

    order: z.coerce
      .number()
      .int()
      .min(1)
      .optional(),

    status: z
      .enum(["active", "inactive"])
      .optional(),

    startDate: z.coerce.date().optional(),

    endDate: z.coerce.date().optional(),
  })
  .refine(
    (data) => {
      if (!data.startDate || !data.endDate) return true;

      return data.endDate > data.startDate;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );
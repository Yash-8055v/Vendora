import { z } from "zod";

export const googleLoginValidation = z.object({
  idToken: z
    .string()
    .trim()
    .min(1, "Google ID token is required"),
});
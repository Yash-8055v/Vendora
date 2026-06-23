import { email, string, z } from "zod";

export const registerUserValidation = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(60, { message: "Name cannot exceed 60 characters" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .min(1, { message: "Email address cannot be empty" })
    .email({ message: "Please enter a valid email address" }),

  password: z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter (A-Z)",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter (a-z)",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "Password must contain at least one number (0-9)",
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least one special character",
  }),
  conformPassword: z.string()
    
  
}).refine((data) => data.password === data.conformPassword, {
  message: "Passwords don't match",
  path: ["conformPassword"],
});



export const loginUserValidation = z.object({
  
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .toLowerCase()
    .min(1, { message: "Email address cannot be empty" })
    .email({ message: "Please enter a valid email address" }),

  password: z
  .string()
  .nonempty({message: "Password is required"})
  
})


export const tokenValidation = z.string().jwt().nonempty(" token is required");
import z from 'zod';


export const rejectionReasonValidation = z.string({ required_error: "Rejection reason is required" }).min(10, { message: "Rejection reason must be at least 10 characters long" }).max(500, { message: "Rejection reason cannot exceed 500 characters" });  
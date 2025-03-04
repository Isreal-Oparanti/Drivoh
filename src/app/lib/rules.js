import { z } from "zod";

export const BookingFormSchema = z.object({
  from: z.string().min(1, { message: "Pick-up point is required" }),
  to: z.string().min(1, { message: "Destination is required" }),
  date: z.string().min(1, { message: "Date is required" }),
  time: z.string().min(1, { message: "Time slot is required" }),
});

export const LoginFormSchema = z.object({
  email: z.string().email({ message: " Please enter a valid email" }).trim(),
  password: z.string().min(2, { message: "Password is required" }).trim(),
});

export const RegisterFormSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, { message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters long" }),
    email: z.string().email({ message: "Please enter a valid email" }).trim(),
    password: z
      .string()
      .trim()
      .min(5, { message: "Password must be at least 5 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    schoolId: z
      .string()
      .trim()
      .min(1, { message: "School ID is required" })
      .min(3, { message: "School ID must be at least 3 characters long" }),
    confirmPassword: z.string().trim(),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password fields do not match.",
        path: ["confirmPassword"],
      });
    }
  });

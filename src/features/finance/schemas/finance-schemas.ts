import { z } from "zod";

export const feeConfigSchema = z.object({
  type: z.enum(["GROUP", "SUBJECT"]),
  targetId: z.string().min(1, "Target ID is required"),
  amount: z.number().positive("Amount must be positive"),
});

export const discountSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  type: z.enum(["PERCENTAGE", "FIXED"]),
  value: z.number().positive("Discount value must be positive"),
  reason: z.string().optional(),
});

export const paymentSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  invoiceId: z.string().optional(),
  amount: z.number().positive("Amount must be positive"),
  method: z.string().min(1, "Payment method is required"),
  transactionId: z.string().optional(),
});

export type FeeConfigInput = z.infer<typeof feeConfigSchema>;
export type DiscountInput = z.infer<typeof discountSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;

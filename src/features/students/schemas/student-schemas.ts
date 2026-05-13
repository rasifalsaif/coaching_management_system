import { z } from "zod";
import { StudentStatus } from "@prisma/client";

export const studentRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  college: z.string().min(2, "College name is required"),
  groupId: z.string().min(1, "Academic group is required"),
  guardianName: z.string().min(2, "Guardian name is required"),
  guardianPhone: z.string().min(11, "Guardian phone is required"),
  address: z.string().min(5, "Address is required"),
});

export const studentUpdateSchema = studentRegistrationSchema.partial().extend({
  status: z.nativeEnum(StudentStatus).optional(),
});

export type StudentRegistrationInput = z.infer<typeof studentRegistrationSchema>;
export type StudentUpdateInput = z.infer<typeof studentUpdateSchema>;

import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  bio: z.string().max(500, "Bio must be under 500 characters").optional(),
  phone: z.string().min(11, "Phone number must be at least 11 digits").optional(),
  image: z.string().url("Invalid image URL").optional().or(z.literal("")),
});

export const teacherProfileSchema = z.object({
  qualification: z.string().min(2, "Qualification is required").optional(),
  experience: z.string().optional(),
  specialization: z.string().optional(),
  description: z.string().max(1000, "Description must be under 1000 characters").optional(),
});

export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type TeacherProfileInput = z.infer<typeof teacherProfileSchema>;
export type PasswordChangeInput = z.infer<typeof passwordChangeSchema>;

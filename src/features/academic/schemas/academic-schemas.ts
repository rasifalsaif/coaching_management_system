import { z } from "zod";

export const groupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  description: z.string().optional(),
});

export const subjectSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code must be at least 2 characters"),
  description: z.string().optional(),
  groupId: z.string().optional().nullable(),
});

export type GroupInput = z.infer<typeof groupSchema>;
export type SubjectInput = z.infer<typeof subjectSchema>;

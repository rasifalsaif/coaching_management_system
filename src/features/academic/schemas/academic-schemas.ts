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

export const batchSchema = z.object({
  name: z.string().min(2, "Name is required"),
  subjectId: z.string().optional().nullable(),
  groupId: z.string().optional().nullable(),
  teacherId: z.string().optional().nullable(),
  startTime: z.string().optional().nullable(),
  endTime: z.string().optional().nullable(),
  days: z.string().optional().nullable(),
});

export const enrollmentSchema = z.object({
  studentId: z.string().min(1, "Student is required"),
  batchId: z.string().min(1, "Batch is required"),
});

export type BatchInput = z.infer<typeof batchSchema>;
export type EnrollmentInput = z.infer<typeof enrollmentSchema>;

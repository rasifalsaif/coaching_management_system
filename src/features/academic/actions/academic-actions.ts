"use server";

import { revalidatePath } from "next/cache";
import { AcademicService } from "../services/academic-service";
import { groupSchema, subjectSchema, GroupInput, SubjectInput } from "../schemas/academic-schemas";

export async function createGroupAction(data: GroupInput) {
  const validated = groupSchema.parse(data);
  const group = await AcademicService.createGroup(validated);
  revalidatePath("/dashboard/admin/academic");
  return group;
}

export async function updateGroupAction(id: string, data: GroupInput) {
  const validated = groupSchema.parse(data);
  const group = await AcademicService.updateGroup(id, validated);
  revalidatePath("/dashboard/admin/academic");
  return group;
}

export async function deleteGroupAction(id: string) {
  await AcademicService.deleteGroup(id);
  revalidatePath("/dashboard/admin/academic");
}

export async function createSubjectAction(data: SubjectInput) {
  const validated = subjectSchema.parse(data);
  const subject = await AcademicService.createSubject(validated);
  revalidatePath("/dashboard/admin/academic");
  return subject;
}

export async function updateSubjectAction(id: string, data: SubjectInput) {
  const validated = subjectSchema.parse(data);
  const subject = await AcademicService.updateSubject(id, validated);
  revalidatePath("/dashboard/admin/academic");
  return subject;
}

export async function deleteSubjectAction(id: string) {
  await AcademicService.deleteSubject(id);
  revalidatePath("/dashboard/admin/academic");
}

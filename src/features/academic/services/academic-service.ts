import { prisma } from "@/lib/prisma";
import { GroupInput, SubjectInput } from "../schemas/academic-schemas";

export const AcademicService = {
  // --- Groups ---
  async getAllGroups() {
    return prisma.group.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { subjects: true, students: true } } },
    });
  },

  async createGroup(data: GroupInput) {
    return prisma.group.create({ data });
  },

  async updateGroup(id: string, data: GroupInput) {
    return prisma.group.update({ where: { id }, data });
  },

  async deleteGroup(id: string) {
    return prisma.group.delete({ where: { id } });
  },

  // --- Subjects ---
  async getAllSubjects() {
    return prisma.subject.findMany({
      orderBy: { name: "asc" },
      include: { group: true },
    });
  },

  async createSubject(data: SubjectInput) {
    return prisma.subject.create({ data });
  },

  async updateSubject(id: string, data: SubjectInput) {
    return prisma.subject.update({ where: { id }, data });
  },

  async deleteSubject(id: string) {
    return prisma.subject.delete({ where: { id } });
  },
};

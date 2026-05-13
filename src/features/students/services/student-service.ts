import { prisma } from "@/lib/prisma";
import { StudentStatus } from "@prisma/client";
import { StudentRegistrationInput, StudentUpdateInput } from "../schemas/student-schemas";

export const StudentService = {
  /**
   * Generates a professional Student ID based on the current year and student count.
   * Format: STU-YYYY-XXXX (e.g., STU-2026-0001)
   */
  async generateStudentId() {
    const year = new Date().getFullYear();
    const count = await prisma.student.count({
      where: {
        studentId: {
          startsWith: `STU-${year}`,
        },
      },
    });
    
    const nextNumber = (count + 1).toString().padStart(4, "0");
    return `STU-${year}-${nextNumber}`;
  },

  async getAllStudents(filters?: { status?: StudentStatus; groupId?: string }) {
    return prisma.student.findMany({
      where: filters,
      include: {
        user: true,
        group: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async getStudentById(id: string) {
    return prisma.student.findUnique({
      where: { id },
      include: {
        user: true,
        group: true,
      },
    });
  },

  async createPendingStudent(data: StudentRegistrationInput & { userId: string }) {
    // Generate a temporary ID until approved
    const tempId = `TEMP-${Date.now()}`;
    
    return prisma.student.create({
      data: {
        userId: data.userId,
        studentId: tempId,
        status: StudentStatus.PENDING,
        phone: data.phone,
        address: data.address,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        groupId: data.groupId,
        // photo field can be added later
      },
    });
  },

  async approveStudent(id: string) {
    const student = await this.getStudentById(id);
    if (!student) throw new Error("Student not found");
    if (student.status !== StudentStatus.PENDING) return student;

    const officialId = await this.generateStudentId();

    return prisma.student.update({
      where: { id },
      data: {
        status: StudentStatus.ACTIVE,
        studentId: officialId,
      },
    });
  },

  async updateStudent(id: string, data: StudentUpdateInput) {
    return prisma.student.update({
      where: { id },
      data: {
        phone: data.phone,
        address: data.address,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        groupId: data.groupId,
        status: data.status,
      },
    });
  },

  async updateUserRole(userId: string, role: "STUDENT" | "TEACHER" | "MANAGER" | "ADMIN") {
    return prisma.user.update({
      where: { id: userId },
      data: { role },
    });
  },
};

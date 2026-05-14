import { prisma } from "@/lib/prisma";
import { StudentStatus } from "@prisma/client";

export const ManagementService = {
  /**
   * Generates IDs for Students (STU-YYYY-XXXX) and Teachers (TEA-YYYY-XXXX)
   */
  async generateProfessionalId(type: "STUDENT" | "TEACHER") {
    const year = new Date().getFullYear();
    const prefix = type === "STUDENT" ? "STU" : "TEA";
    
    const count = type === "STUDENT" 
      ? await prisma.student.count({ where: { studentId: { startsWith: `${prefix}-${year}` } } })
      : await prisma.teacher.count({ where: { teacherId: { startsWith: `${prefix}-${year}` } } });
    
    const nextNumber = (count + 1).toString().padStart(4, "0");
    return `${prefix}-${year}-${nextNumber}`;
  },

  /**
   * Assigns a public User to be a Student
   */
  async assignToStudent(userId: string, data: { college?: string; groupId?: string }) {
    const officialId = await this.generateProfessionalId("STUDENT");

    return prisma.$transaction(async (tx) => {
      // 1. Update User Role
      await tx.user.update({
        where: { id: userId },
        data: { role: "STUDENT" },
      });

      // 2. Create Student Profile
      return tx.student.create({
        data: {
          userId,
          studentId: officialId,
          status: "ACTIVE",
          college: data.college,
          groupId: data.groupId,
        },
      });
    });
  },

  /**
   * Assigns a public User to be a Teacher
   */
  async assignToTeacher(userId: string, data: { specialization?: string; qualification?: string }) {
    const officialId = await this.generateProfessionalId("TEACHER");

    return prisma.$transaction(async (tx) => {
      // 1. Update User Role
      await tx.user.update({
        where: { id: userId },
        data: { role: "TEACHER" },
      });

      // 2. Create Teacher Profile
      return tx.teacher.create({
        data: {
          userId,
          teacherId: officialId,
          specialization: data.specialization,
          qualification: data.qualification,
          status: "ACTIVE",
        },
      });
    });
  },

  async getDashboardStats() {
    const [studentCount, teacherCount, batchCount, pendingInvoices] = await Promise.all([
      prisma.student.count({ where: { status: "ACTIVE" } }),
      prisma.teacher.count({ where: { status: "ACTIVE" } }),
      prisma.batch.count(),
      prisma.invoice.aggregate({
        _sum: { amount: true },
        where: { status: { in: ["PENDING", "PARTIAL", "OVERDUE"] } }
      })
    ]);

    return {
      studentCount,
      teacherCount,
      batchCount,
      pendingAmount: Number(pendingInvoices._sum.amount || 0)
    };
  }
};

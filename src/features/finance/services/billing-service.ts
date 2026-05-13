import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const BillingService = {
  /**
   * Calculates the total monthly fee for a student based on their group and individual subjects.
   */
  async calculateStudentMonthlyFee(studentId: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: {
        group: true,
        enrollments: {
            include: { batch: { include: { subject: true } } }
        },
        discount: true,
      },
    });

    if (!student) throw new Error("Student not found");

    // 0. Check for Custom Fee Override (Manager set)
    if (student.customMonthlyFee) {
        return {
            baseAmount: student.customMonthlyFee,
            discountAmount: new Prisma.Decimal(0),
            finalAmount: student.customMonthlyFee,
        };
    }

    let totalBaseAmount = new Prisma.Decimal(0);

    // 1. Check for Group-based Fee
    if (student.groupId) {
      const groupFee = await prisma.feeConfig.findUnique({
        where: { targetId: student.groupId },
      });
      if (groupFee) {
        totalBaseAmount = totalBaseAmount.add(groupFee.amount);
      }
    }

    // 2. Check for Individual Subject Fees (only for subjects NOT in their group)
    // For now, simpler logic: all enrolled subjects have a fee if configured
    const subjectIds = student.enrollments.map(e => e.batch.subjectId);
    const subjectFees = await prisma.feeConfig.findMany({
      where: { targetId: { in: subjectIds }, type: "SUBJECT" },
    });

    subjectFees.forEach(fee => {
      totalBaseAmount = totalBaseAmount.add(fee.amount);
    });

    // 3. Apply Discount
    let discountAmount = new Prisma.Decimal(0);
    if (student.discount) {
      if (student.discount.type === "PERCENTAGE") {
        discountAmount = totalBaseAmount.mul(student.discount.value).div(100);
      } else {
        discountAmount = student.discount.value;
      }
    }

    const finalAmount = totalBaseAmount.sub(discountAmount);

    return {
      baseAmount: totalBaseAmount,
      discountAmount,
      finalAmount: finalAmount.isNegative() ? new Prisma.Decimal(0) : finalAmount,
    };
  },

  /**
   * Generates a monthly invoice for a student.
   */
  async generateMonthlyInvoice(studentId: string, month: string) {
    const { baseAmount, discountAmount, finalAmount } = await this.calculateStudentMonthlyFee(studentId);

    // Set due date to 10th of next month
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(10);

    return prisma.invoice.create({
      data: {
        studentId,
        month,
        baseAmount,
        discountAmount,
        amount: finalAmount,
        dueDate,
        status: "PENDING",
      },
    });
  },

  async getStudentDues(studentId: string) {
    const unpaidInvoices = await prisma.invoice.findMany({
      where: { 
        studentId, 
        status: { in: ["PENDING", "PARTIAL", "OVERDUE"] } 
      },
      orderBy: { dueDate: "asc" }
    });

    const totalDue = unpaidInvoices.reduce((acc, inv) => acc.add(inv.amount), new Prisma.Decimal(0));
    
    return {
      invoices: unpaidInvoices,
      totalDue,
    };
  },

  /**
   * Fetches the full profile of a student using their userId.
   */
  async getStudentFullProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
          include: {
            group: true,
            enrollments: {
              include: { batch: { include: { subject: true } } }
            },
            discount: true,
          }
        }
      }
    });
  }
};


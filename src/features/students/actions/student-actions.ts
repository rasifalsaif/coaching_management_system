"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-client";
import { Prisma } from "@prisma/client";

/**
 * Updates a student's custom monthly fee override.
 */
export async function updateStudentCustomFeeAction(studentId: string, customFee: number | null) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const updated = await prisma.student.update({
        where: { id: studentId },
        data: {
            customMonthlyFee: customFee !== null ? new Prisma.Decimal(customFee) : null,
        },
    });

    revalidatePath("/dashboard/admin/students");
    return { success: true, data: updated };
}

/**
 * Records an offline payment (Cash, etc.) and updates the relevant invoice.
 */
export async function recordOfflinePaymentAction(data: {
    studentId: string;
    invoiceId: string;
    amount: number;
    method: string;
    transactionId?: string;
}) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    return prisma.$transaction(async (tx) => {
        // 1. Create Payment Record
        const payment = await tx.payment.create({
            data: {
                studentId: data.studentId,
                invoiceId: data.invoiceId,
                amount: new Prisma.Decimal(data.amount),
                method: data.method,
                transactionId: data.transactionId,
                paidAt: new Date(),
            }
        });

        // 2. Update Invoice Status
        const invoice = await tx.invoice.findUnique({
            where: { id: data.invoiceId },
            include: { payments: true }
        });

        if (invoice) {
            const totalPaid = invoice.payments.reduce((sum, p) => sum.add(p.amount), new Prisma.Decimal(0));
            const status = totalPaid.gte(invoice.amount) ? "PAID" : "PARTIAL";
            
            await tx.invoice.update({
                where: { id: data.invoiceId },
                data: { status }
            });
        }

        revalidatePath("/dashboard/admin/students");
        revalidatePath("/dashboard/student/finance");
        return { success: true, data: payment };
    });
}

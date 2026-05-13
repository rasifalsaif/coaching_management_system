"use server";

import { revalidatePath } from "next/cache";
import { BillingService } from "../services/billing-service";
import { prisma } from "@/lib/prisma";
import { 
    feeConfigSchema, 
    discountSchema, 
    paymentSchema,
    FeeConfigInput,
    DiscountInput,
    PaymentInput
} from "../schemas/finance-schemas";

/**
 * Action to configure a fee for a Group or Subject.
 */
export async function saveFeeConfigAction(data: FeeConfigInput) {
    const validated = feeConfigSchema.parse(data);
    
    const config = await prisma.feeConfig.upsert({
        where: { targetId: validated.targetId },
        update: { amount: validated.amount, type: validated.type },
        create: { 
            targetId: validated.targetId, 
            amount: validated.amount, 
            type: validated.type 
        },
    });

    revalidatePath("/dashboard/admin/finance");
    return config;
}

/**
 * Action to apply a discount/scholarship to a student.
 */
export async function applyDiscountAction(data: DiscountInput) {
    const validated = discountSchema.parse(data);

    const discount = await prisma.discount.upsert({
        where: { studentId: validated.studentId },
        update: { type: validated.type, value: validated.value, reason: validated.reason },
        create: validated,
    });

    revalidatePath("/dashboard/admin/students");
    return discount;
}

/**
 * Action to record a payment.
 */
export async function recordPaymentAction(data: PaymentInput) {
    const validated = paymentSchema.parse(data);

    return prisma.$transaction(async (tx) => {
        // 1. Create Payment Record
        const payment = await tx.payment.create({
            data: {
                studentId: validated.studentId,
                invoiceId: validated.invoiceId,
                amount: validated.amount,
                method: validated.method,
                transactionId: validated.transactionId,
            }
        });

        // 2. If linked to an invoice, update its status
        if (validated.invoiceId) {
            const invoice = await tx.invoice.findUnique({
                where: { id: validated.invoiceId },
                include: { payments: true }
            });

            if (invoice) {
                const totalPaid = invoice.payments.reduce((sum, p) => sum + Number(p.amount), 0) + validated.amount;
                const status = totalPaid >= Number(invoice.amount) ? "PAID" : "PARTIAL";
                
                await tx.invoice.update({
                    where: { id: validated.invoiceId },
                    data: { status }
                });
            }
        }

        revalidatePath("/dashboard/admin/finance");
        revalidatePath("/dashboard/student/finance");
        return payment;
    });
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { batchSchema, BatchInput, enrollmentSchema, EnrollmentInput } from "../schemas/academic-schemas";
import { getSession } from "@/lib/auth-client";

export async function createBatchAction(data: BatchInput) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const validated = batchSchema.parse(data);

    const batch = await prisma.batch.create({
        data: validated,
    });

    revalidatePath("/dashboard/admin/academics");
    revalidatePath("/dashboard/admin/batches");
    return { success: true, data: batch };
}

export async function enrollStudentAction(data: EnrollmentInput) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const validated = enrollmentSchema.parse(data);

    const enrollment = await prisma.enrollment.create({
        data: {
            studentId: validated.studentId,
            batchId: validated.batchId,
            status: "ACTIVE",
        },
    });

    revalidatePath("/dashboard/admin/students");
    revalidatePath("/dashboard/admin/batches");
    return { success: true, data: enrollment };
}

export async function getAllBatchesAction() {
    return prisma.batch.findMany({
        include: {
            subject: true,
            group: true,
            teacher: { include: { user: true } },
            _count: { select: { enrollments: true } }
        },
        orderBy: { name: "asc" }
    });
}

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-client";
import { Prisma } from "@prisma/client";

export async function createExamAction(data: {
    name: string;
    date: Date;
    totalMarks: number;
    batchId: string;
}) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const exam = await prisma.exam.create({
        data: {
            name: data.name,
            date: data.date,
            totalMarks: new Prisma.Decimal(data.totalMarks),
            batchId: data.batchId
        }
    });

    revalidatePath("/dashboard/admin/results");
    return { success: true, data: exam };
}

export async function bulkUpdateResultsAction(data: {
    examId: string;
    results: { studentId: string; marks: number; comment?: string }[];
}) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    return prisma.$transaction(async (tx) => {
        // Delete existing results for this exam to prevent unique constraint issues
        await tx.result.deleteMany({
            where: { examId: data.examId }
        });

        // Create new results
        const resultsData = data.results.map(r => ({
            examId: data.examId,
            studentId: r.studentId,
            marks: new Prisma.Decimal(r.marks),
            comment: r.comment
        }));

        await tx.result.createMany({
            data: resultsData
        });

        revalidatePath("/dashboard/admin/results");
        revalidatePath("/dashboard/student/results");
        return { success: true };
    });
}

export async function getBatchExamsAction(batchId: string) {
    return prisma.exam.findMany({
        where: { batchId },
        include: { _count: { select: { results: true } } },
        orderBy: { date: "desc" }
    });
}

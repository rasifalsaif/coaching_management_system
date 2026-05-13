"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-client";
import { AttendanceStatus } from "@prisma/client";

export async function updateBatchAttendanceAction(data: {
    batchId: string;
    date: Date;
    absentStudentIds: string[];
}) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const { batchId, date, absentStudentIds } = data;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    return prisma.$transaction(async (tx) => {
        // 1. Get all students enrolled in the batch
        const enrollments = await tx.enrollment.findMany({
            where: { batchId },
            select: { studentId: true }
        });

        const studentIds = enrollments.map(e => e.studentId);

        // 2. Delete existing attendance for this batch/date
        await tx.attendance.deleteMany({
            where: {
                batchId,
                date: {
                    gte: startOfDay,
                    lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
                }
            }
        });

        // 3. Create new attendance records
        const attendanceData = studentIds.map(studentId => ({
            studentId,
            batchId,
            date: startOfDay,
            status: absentStudentIds.includes(studentId) ? AttendanceStatus.ABSENT : AttendanceStatus.PRESENT
        }));

        await tx.attendance.createMany({
            data: attendanceData
        });

        revalidatePath("/dashboard/admin/attendance");
        return { success: true };
    });
}

export async function getBatchAttendanceAction(batchId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    return prisma.attendance.findMany({
        where: {
            batchId,
            date: {
                gte: startOfDay,
                lt: new Date(startOfDay.getTime() + 24 * 60 * 60 * 1000)
            }
        }
    });
}

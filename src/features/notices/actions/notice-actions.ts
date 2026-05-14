"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth-client";

export async function createNoticeAction(data: {
    title: string;
    content: string;
    isGlobal: boolean;
}) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER", "TEACHER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const teacher = session.user.role === "TEACHER" 
        ? await prisma.teacher.findUnique({ where: { userId: session.user.id } })
        : null;

    const notice = await prisma.notice.create({
        data: {
            title: data.title,
            content: data.content,
            isGlobal: data.isGlobal,
            teacherId: teacher?.id || null
        }
    });

    revalidatePath("/dashboard/notices");
    return { success: true, data: notice };
}

export async function deleteNoticeAction(noticeId: string) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        // Teachers should only delete their own notices
        if (session.user.role === "TEACHER") {
            const teacher = await prisma.teacher.findUnique({ where: { userId: session.user.id } });
            const notice = await prisma.notice.findUnique({ where: { id: noticeId } });
            if (notice?.teacherId !== teacher?.id) {
                throw new Error("Unauthorized: You can only delete your own notices");
            }
        } else {
            throw new Error("Unauthorized");
        }
    }

    await prisma.notice.delete({
        where: { id: noticeId }
    });

    revalidatePath("/dashboard/notices");
    return { success: true };
}

export async function getNoticesAction() {
    return prisma.notice.findMany({
        include: {
            teacher: { include: { user: true } }
        },
        orderBy: { createdAt: "desc" }
    });
}

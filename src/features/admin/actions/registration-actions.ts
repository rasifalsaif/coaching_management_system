"use server";

import { revalidatePath } from "next/cache";
import { ManagementService } from "@/services/management-service";
import { UserService } from "@/services/user-service";
import { auth } from "@/lib/auth";
import { getSession } from "@/lib/auth-client";

/**
 * Fetches all users who have registered but haven't been assigned a role yet.
 */
export async function getPendingRegistrationsAction() {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    return UserService.getAllUnassignedUsers();
}

/**
 * Assigns a user as a student and creates their profile.
 */
export async function assignAsStudentAction(userId: string, data: { college?: string; groupId?: string }) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const result = await ManagementService.assignToStudent(userId, data);
    
    revalidatePath("/dashboard/admin/registrations");
    revalidatePath("/dashboard/admin/students");
    return { success: true, data: result };
}

/**
 * Assigns a user as a teacher and creates their profile.
 */
export async function assignAsTeacherAction(userId: string, data: { specialization?: string; qualification?: string }) {
    const session = await getSession();
    if (!session || !["ADMIN", "MANAGER"].includes(session.user.role)) {
        throw new Error("Unauthorized");
    }

    const result = await ManagementService.assignToTeacher(userId, data);
    
    revalidatePath("/dashboard/admin/registrations");
    revalidatePath("/dashboard/admin/teachers");
    return { success: true, data: result };
}

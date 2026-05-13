"use server";

import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { StudentService } from "../services/student-service";
import { studentRegistrationSchema, StudentRegistrationInput } from "../schemas/student-schemas";
import { headers } from "next/headers";

/**
 * Action for Manager to create a student account.
 * This handles User creation (Better Auth) and Student Profile creation.
 */
export async function createStudentAction(data: StudentRegistrationInput) {
    const validated = studentRegistrationSchema.parse(data);

    // 1. Create User via Better Auth API
    // The password is set to the student's phone number as requested
    const user = await auth.api.signUpEmail({
        body: {
            email: validated.email,
            password: validated.phone,
            name: validated.name,
        },
        headers: await headers(),
    });

    if (!user) {
        throw new Error("Failed to create user account.");
    }

    // 2. Assign Role to User (Prisma directly since we need to update custom field)
    await StudentService.updateUserRole(user.user.id, "STUDENT");

    // 3. Create Student Profile (Defaults to PENDING)
    const student = await StudentService.createPendingStudent({
        ...validated,
        userId: user.user.id,
    });

    revalidatePath("/dashboard/admin/students");
    return { success: true, studentId: student.id };
}

/**
 * Action for Manager to approve a pending student.
 */
export async function approveStudentAction(studentId: string) {
    const student = await StudentService.approveStudent(studentId);
    revalidatePath("/dashboard/admin/students");
    return { success: true, officialId: student.studentId };
}

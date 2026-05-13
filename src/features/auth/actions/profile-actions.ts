"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { ProfileService } from "../services/profile-service";
import { 
    userProfileSchema, 
    teacherProfileSchema, 
    passwordChangeSchema,
    UserProfileInput,
    TeacherProfileInput,
    PasswordChangeInput
} from "../schemas/profile-schemas";
import { getSession } from "@/lib/auth-client";

/**
 * Action to update base user info (Bio, Name, Phone, Photo URL)
 */
export async function updateBaseProfileAction(data: UserProfileInput) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const validated = userProfileSchema.parse(data);
    await ProfileService.updateBaseProfile(session.user.id, validated);
    
    revalidatePath("/dashboard");
    return { success: true };
}

/**
 * Action for Teachers to update their professional description/specialization
 */
export async function updateTeacherProfileAction(data: TeacherProfileInput) {
    const session = await getSession();
    if (!session || session.user.role !== "TEACHER") {
        throw new Error("Unauthorized: Teacher access only");
    }

    const validated = teacherProfileSchema.parse(data);
    await ProfileService.updateTeacherProfile(session.user.id, validated);
    
    revalidatePath("/dashboard/teacher");
    revalidatePath("/teachers"); // Revalidate public teachers page
    return { success: true };
}

/**
 * Action to change password via Better Auth
 */
export async function changePasswordAction(data: PasswordChangeInput) {
    const session = await getSession();
    if (!session) throw new Error("Unauthorized");

    const validated = passwordChangeSchema.parse(data);

    // Call Better Auth API to change password
    const result = await auth.api.changePassword({
        body: {
            currentPassword: validated.currentPassword,
            newPassword: validated.newPassword,
            revokeOtherSessions: true,
        },
        headers: await headers(),
    });

    if (!result) {
        throw new Error("Failed to change password. Please check your current password.");
    }

    return { success: true };
}

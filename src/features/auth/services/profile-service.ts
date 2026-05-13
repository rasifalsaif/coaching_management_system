import { prisma } from "@/lib/prisma";
import { UserProfileInput, TeacherProfileInput } from "../schemas/profile-schemas";

export const ProfileService = {
  /**
   * Updates core user profile data (Name, Bio, Phone, Image)
   */
  async updateBaseProfile(userId: string, data: UserProfileInput) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        bio: data.bio,
        phone: data.phone,
        image: data.image,
      },
    });
  },

  /**
   * Updates teacher-specific profile data
   */
  async updateTeacherProfile(userId: string, data: TeacherProfileInput) {
    return prisma.teacher.update({
      where: { userId },
      data: {
        qualification: data.qualification,
        experience: data.experience,
        specialization: data.specialization,
        description: data.description,
      },
    });
  },

  /**
   * Fetches full profile data for the current user
   */
  async getFullProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: {
            include: { group: true }
        },
        teacher: true,
      },
    });
  },
};

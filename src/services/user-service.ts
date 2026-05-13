import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";

export const UserService = {
  async getAllUnassignedUsers() {
    return prisma.user.findMany({
      where: {
        role: "USER",
      },
      orderBy: { createdAt: "desc" },
    });
  },

  async updateUserProfile(userId: string, data: {
    name?: string;
    bio?: string;
    phone?: string;
    image?: string;
  }) {
    return prisma.user.update({
      where: { id: userId },
      data,
    });
  },

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        student: true,
        teacher: true,
      },
    });
  },
};

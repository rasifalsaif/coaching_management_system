-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('PENDING', 'ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "student" ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'PENDING';

import { prisma } from "@/lib/prisma";
import { StudentManagement } from "@/features/students/components/student-management";
import { Users } from "lucide-react";

export default async function AdminStudentsPage() {
    const students = await prisma.student.findMany({
        where: { status: "ACTIVE" },
        include: {
            user: true,
            group: true,
            invoices: {
                orderBy: { dueDate: "desc" }
            }
        },
        orderBy: { studentId: "asc" }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Student Management</h1>
                    <p className="text-muted-foreground">
                        Manage student fees, record payments, and view profiles.
                    </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Users className="h-6 w-6" />
                </div>
            </div>

            <StudentManagement students={students} />
        </div>
    );
}

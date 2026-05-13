import { prisma } from "@/lib/prisma";
import { AttendanceManager } from "@/features/attendance/components/attendance-manager";
import { ClipboardList } from "lucide-react";

export default async function AdminAttendancePage() {
    const batches = await prisma.batch.findMany({
        include: {
            subject: true,
            group: true,
            enrollments: {
                include: {
                    student: {
                        include: { user: true }
                    }
                }
            }
        },
        orderBy: { name: "asc" }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
                    <p className="text-muted-foreground">
                        Select a batch and date to record student absences.
                    </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                    <ClipboardList className="h-6 w-6" />
                </div>
            </div>

            <AttendanceManager batches={batches} />
        </div>
    );
}

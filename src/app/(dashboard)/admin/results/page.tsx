import { prisma } from "@/lib/prisma";
import { ResultsManager } from "@/features/results/components/results-manager";
import { GraduationCap } from "lucide-react";

export default async function AdminResultsPage() {
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
                    <h1 className="text-3xl font-bold tracking-tight">Result Management</h1>
                    <p className="text-muted-foreground">
                        Create exams and input student marks for each batch.
                    </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <GraduationCap className="h-6 w-6" />
                </div>
            </div>

            <ResultsManager batches={batches} />
        </div>
    );
}

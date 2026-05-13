import { AcademicService } from "@/features/academic/services/academic-service";
import { getAllBatchesAction } from "@/features/academic/actions/academic-actions";
import { prisma } from "@/lib/prisma";
import { BookOpen, Layers, Users, Plus } from "lucide-react";
import { BatchList } from "@/features/academic/components/batch-list";

export default async function AcademicsPage() {
    const groups = await AcademicService.getAllGroups();
    const subjects = await AcademicService.getAllSubjects();
    const batches = await getAllBatchesAction();
    const teachers = await prisma.teacher.findMany({ include: { user: true } });
    const students = await prisma.student.findMany({ 
        where: { status: "ACTIVE" },
        include: { user: true } 
    });

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Academic Management</h1>
                <p className="text-muted-foreground">
                    Manage your coaching center's groups, subjects, and batches.
                </p>
            </div>

            <div className="grid gap-6">
                {/* Batches Section */}
                <BatchList 
                    batches={batches} 
                    subjects={subjects} 
                    teachers={teachers} 
                    students={students} 
                />

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Groups Section */}
                    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                        <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Groups</h2>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Add Group</button>
                        </div>
                        <ul className="divide-y">
                            {groups.map(g => (
                                <li key={g.id} className="px-6 py-4 flex items-center justify-between">
                                    <span className="font-medium">{g.name}</span>
                                    <span className="text-xs text-gray-500">{g._count.subjects} Subjects</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subjects Section */}
                    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                        <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900">Subjects</h2>
                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">Add Subject</button>
                        </div>
                        <ul className="divide-y">
                            {subjects.map(s => (
                                <li key={s.id} className="px-6 py-4 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="font-medium">{s.name}</span>
                                        <span className="text-xs text-gray-500">{s.code}</span>
                                    </div>
                                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">{s.group?.name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

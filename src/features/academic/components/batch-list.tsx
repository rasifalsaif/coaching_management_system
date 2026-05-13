"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { CreateBatchForm } from "./create-batch-form";
import { EnrollStudentForm } from "./enroll-student-form";

interface BatchListProps {
    batches: any[];
    subjects: any[];
    groups: any[];
    teachers: any[];
    students: any[];
}

export function BatchList({ batches, subjects, groups, teachers, students }: BatchListProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [enrollBatch, setEnrollBatch] = useState<any | null>(null);

    return (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Active Batches</h2>
                    <p className="text-sm text-muted-foreground">Manage schedules and student enrollments.</p>
                </div>
                <button 
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    <Plus className="h-4 w-4" />
                    Create Batch
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50/50 font-medium text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Batch Name</th>
                            <th className="px-6 py-3">Subject / Group</th>
                            <th className="px-6 py-3">Teacher</th>
                            <th className="px-6 py-3">Schedule</th>
                            <th className="px-6 py-3">Students</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {batches.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">No batches created yet.</td>
                            </tr>
                        ) : (
                            batches.map((batch) => (
                                <tr key={batch.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium">{batch.name}</td>
                                    <td className="px-6 py-4">
                                        {batch.subject ? (
                                            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                                {batch.subject.name}
                                            </span>
                                        ) : batch.group ? (
                                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                                {batch.group.name} Full Group
                                            </span>
                                        ) : "General"}
                                    </td>
                                    <td className="px-6 py-4">{batch.teacher?.user.name || "Unassigned"}</td>
                                    <td className="px-6 py-4 text-xs">
                                        <div className="font-medium text-gray-900">{batch.days || "N/A"}</div>
                                        <div className="text-gray-500">{batch.startTime} - {batch.endTime}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                                            {batch._count.enrollments} Enrolled
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button 
                                            onClick={() => setEnrollBatch(batch)}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Enroll Student
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showCreateModal && (
                <CreateBatchForm 
                    subjects={subjects} 
                    groups={groups}
                    teachers={teachers} 
                    onClose={() => setShowCreateModal(false)} 
                />
            )}

            {enrollBatch && (
                <EnrollStudentForm 
                    batchId={enrollBatch.id} 
                    batchName={enrollBatch.name} 
                    students={students} 
                    onClose={() => setEnrollBatch(null)} 
                />
            )}
        </div>
    );
}

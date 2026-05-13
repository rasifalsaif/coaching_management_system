"use client";

import { useState, useEffect } from "react";
import { updateBatchAttendanceAction, getBatchAttendanceAction } from "../actions/attendance-actions";
import { format } from "date-fns";
import { Loader2, Check, X, Calendar as CalendarIcon, Save } from "lucide-react";

interface AttendanceManagerProps {
    batches: any[];
}

export function AttendanceManager({ batches }: AttendanceManagerProps) {
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const [date, setDate] = useState(format(new Date(), "yyyy-MM-dd"));
    const [students, setStudents] = useState<any[]>([]);
    const [absentIds, setAbsentIds] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const selectedBatch = batches.find(b => b.id === selectedBatchId);

    useEffect(() => {
        if (selectedBatchId) {
            loadAttendance();
        } else {
            setStudents([]);
            setAbsentIds([]);
        }
    }, [selectedBatchId, date]);

    const loadAttendance = async () => {
        setLoading(true);
        try {
            // Get batch with students
            // Since we don't have a direct "getBatchWithStudents" action yet, 
            // we'll assume the 'batches' prop passed to the page includes them or we fetch them here.
            // Let's assume the component receives batches with enrollments included.
            const batch = batches.find(b => b.id === selectedBatchId);
            if (batch) {
                setStudents(batch.enrollments.map((e: any) => e.student));
                
                // Load existing attendance
                const existing = await getBatchAttendanceAction(selectedBatchId, new Date(date));
                setAbsentIds(existing.filter(a => a.status === "ABSENT").map(a => a.studentId));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleAbsence = (studentId: string) => {
        setAbsentIds(prev => 
            prev.includes(studentId) 
                ? prev.filter(id => id !== studentId) 
                : [...prev, studentId]
        );
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateBatchAttendanceAction({
                batchId: selectedBatchId,
                date: new Date(date),
                absentStudentIds: absentIds
            });
            alert("Attendance updated successfully!");
        } catch (error) {
            alert("Failed to save attendance");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Select Batch</label>
                    <select
                        value={selectedBatchId}
                        onChange={(e) => setSelectedBatchId(e.target.value)}
                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                    >
                        <option value="">Choose a batch...</option>
                        {batches.map(b => (
                            <option key={b.id} value={b.id}>{b.name} ({b.group?.name || b.subject?.name})</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium">Select Date</label>
                    <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>
                </div>
            </div>

            {selectedBatchId && (
                <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                    <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Attendance Sheet</h2>
                            <p className="text-sm text-gray-500">
                                {students.length} Students • {absentIds.length} Absent
                            </p>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                            Save Attendance
                        </button>
                    </div>

                    <div className="p-0">
                        {loading ? (
                            <div className="p-12 flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>
                        ) : (
                            <table className="w-full text-left text-sm">
                                <thead className="border-b bg-gray-50/50 font-medium text-gray-700">
                                    <tr>
                                        <th className="px-6 py-3">Student Name</th>
                                        <th className="px-6 py-3">ID</th>
                                        <th className="px-6 py-3 text-center">Status</th>
                                        <th className="px-6 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {students.map((student) => {
                                        const isAbsent = absentIds.includes(student.id);
                                        return (
                                            <tr key={student.id} className={isAbsent ? "bg-red-50/50" : "hover:bg-gray-50"}>
                                                <td className="px-6 py-4 font-medium">{student.user.name}</td>
                                                <td className="px-6 py-4 text-xs font-mono">{student.studentId}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                                                        isAbsent ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                                                    }`}>
                                                        {isAbsent ? "ABSENT" : "PRESENT"}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => toggleAbsence(student.id)}
                                                        className={`rounded-md px-3 py-1 text-xs font-bold transition-colors ${
                                                            isAbsent 
                                                                ? "bg-green-600 text-white hover:bg-green-700" 
                                                                : "bg-red-600 text-white hover:bg-red-700"
                                                        }`}
                                                    >
                                                        Mark {isAbsent ? "Present" : "Absent"}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

"use client";

import { useState } from "react";
import { enrollStudentAction } from "../actions/academic-actions";
import { Loader2, Check, X } from "lucide-react";

interface EnrollStudentFormProps {
    batchId: string;
    batchName: string;
    students: any[];
    onClose: () => void;
}

export function EnrollStudentForm({ batchId, batchName, students, onClose }: EnrollStudentFormProps) {
    const [studentId, setStudentId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await enrollStudentAction({
                studentId,
                batchId
            });
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to enroll student. They might already be in this batch.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Enroll Student</h2>
                        <p className="text-sm text-gray-500">Enrolling into: {batchName}</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Select Student</label>
                        <select
                            required
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Choose a student...</option>
                            {students.map(s => (
                                <option key={s.id} value={s.id}>
                                    {s.user.name} ({s.studentId})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !studentId}
                            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            Confirm Enrollment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

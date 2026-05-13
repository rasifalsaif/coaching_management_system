"use client";

import { useState, useEffect } from "react";
import { createExamAction, bulkUpdateResultsAction, getBatchExamsAction } from "../actions/results-actions";
import { Loader2, Plus, Save, ChevronRight, GraduationCap } from "lucide-react";

interface ResultsManagerProps {
    batches: any[];
}

export function ResultsManager({ batches }: ResultsManagerProps) {
    const [selectedBatchId, setSelectedBatchId] = useState("");
    const [exams, setExams] = useState<any[]>([]);
    const [selectedExam, setSelectedExam] = useState<any | null>(null);
    const [marks, setMarks] = useState<Record<string, string>>({});
    const [comments, setComments] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    // New Exam Modal state
    const [showNewExam, setShowNewExam] = useState(false);
    const [examName, setExamName] = useState("");
    const [totalMarks, setTotalMarks] = useState("100");
    const [examDate, setExamDate] = useState(new Date().toISOString().split("T")[0]);

    useEffect(() => {
        if (selectedBatchId) {
            loadExams();
        } else {
            setExams([]);
            setSelectedExam(null);
        }
    }, [selectedBatchId]);

    const loadExams = async () => {
        setLoading(true);
        try {
            const data = await getBatchExamsAction(selectedBatchId);
            setExams(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateExam = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await createExamAction({
                name: examName,
                totalMarks: parseFloat(totalMarks),
                date: new Date(examDate),
                batchId: selectedBatchId
            });
            setShowNewExam(false);
            loadExams();
        } catch (error) {
            alert("Failed to create exam");
        } finally {
            setSaving(false);
        }
    };

    const handleSaveResults = async () => {
        setSaving(true);
        try {
            const results = Object.entries(marks).map(([studentId, marksValue]) => ({
                studentId,
                marks: parseFloat(marksValue),
                comment: comments[studentId] || ""
            }));

            await bulkUpdateResultsAction({
                examId: selectedExam.id,
                results
            });
            alert("Results updated successfully!");
            setSelectedExam(null);
            loadExams();
        } catch (error) {
            alert("Failed to save results");
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
            </div>

            {selectedBatchId && (
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Exams List */}
                    <div className="lg:col-span-1 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">Exams</h2>
                            <button
                                onClick={() => setShowNewExam(true)}
                                className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
                            >
                                <Plus className="h-3 w-3" />
                                New Exam
                            </button>
                        </div>
                        <div className="divide-y rounded-xl border bg-white shadow-sm overflow-hidden">
                            {exams.length === 0 ? (
                                <div className="p-8 text-center text-sm text-gray-500">No exams yet.</div>
                            ) : (
                                exams.map(exam => (
                                    <button
                                        key={exam.id}
                                        onClick={() => setSelectedExam(exam)}
                                        className={`flex w-full items-center justify-between p-4 text-left transition-colors ${
                                            selectedExam?.id === exam.id ? "bg-blue-50" : "hover:bg-gray-50"
                                        }`}
                                    >
                                        <div>
                                            <div className="font-bold text-gray-900">{exam.name}</div>
                                            <div className="text-xs text-gray-500">{new Date(exam.date).toLocaleDateString()}</div>
                                        </div>
                                        <ChevronRight className={`h-4 w-4 ${selectedExam?.id === exam.id ? "text-blue-600" : "text-gray-300"}`} />
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Results Input */}
                    <div className="lg:col-span-2">
                        {selectedExam ? (
                            <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
                                <div className="border-b bg-gray-50 px-6 py-4 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">{selectedExam.name}</h2>
                                        <p className="text-sm text-gray-500">Total Marks: {Number(selectedExam.totalMarks)}</p>
                                    </div>
                                    <button
                                        onClick={handleSaveResults}
                                        disabled={saving}
                                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                                    >
                                        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                                        Save Results
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm">
                                        <thead className="border-b bg-gray-50/50 font-medium text-gray-700">
                                            <tr>
                                                <th className="px-6 py-3">Student Name</th>
                                                <th className="px-6 py-3 w-32">Marks</th>
                                                <th className="px-6 py-3">Comment</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y">
                                            {batches.find(b => b.id === selectedBatchId)?.enrollments.map((e: any) => (
                                                <tr key={e.student.id}>
                                                    <td className="px-6 py-4 font-medium">{e.student.user.name}</td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="number"
                                                            value={marks[e.student.id] || ""}
                                                            onChange={(evt) => setMarks(prev => ({ ...prev, [e.student.id]: evt.target.value }))}
                                                            className="w-full rounded-md border border-gray-300 p-1.5 text-sm"
                                                            placeholder="0"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <input
                                                            type="text"
                                                            value={comments[e.student.id] || ""}
                                                            onChange={(evt) => setComments(prev => ({ ...prev, [e.student.id]: evt.target.value }))}
                                                            className="w-full rounded-md border border-gray-300 p-1.5 text-sm"
                                                            placeholder="Optional comment..."
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 text-gray-500">
                                <GraduationCap className="mb-2 h-10 w-10 text-gray-300" />
                                <p>Select an exam to enter marks.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* New Exam Modal */}
            {showNewExam && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                        <h2 className="mb-4 text-xl font-bold">Create New Exam</h2>
                        <form onSubmit={handleCreateExam} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium">Exam Name</label>
                                <input
                                    required
                                    value={examName}
                                    onChange={(e) => setExamName(e.target.value)}
                                    placeholder="e.g. Monthly Test - Physics"
                                    className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500"
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Total Marks</label>
                                    <input
                                        type="number"
                                        required
                                        value={totalMarks}
                                        onChange={(e) => setTotalMarks(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Exam Date</label>
                                    <input
                                        type="date"
                                        required
                                        value={examDate}
                                        onChange={(e) => setExamDate(e.target.value)}
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm"
                                    />
                                </div>
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowNewExam(false)} className="flex-1 rounded-md border border-gray-300 py-2 text-sm font-medium">Cancel</button>
                                <button type="submit" disabled={saving} className="flex-1 rounded-md bg-blue-600 py-2 text-sm font-bold text-white hover:bg-blue-700">
                                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Exam"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

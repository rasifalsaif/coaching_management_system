"use client";

import { useState } from "react";
import { createBatchAction } from "../actions/academic-actions";
import { Loader2, Check, X } from "lucide-react";

interface CreateBatchFormProps {
    subjects: any[];
    groups: any[];
    teachers: any[];
    onClose: () => void;
}

export function CreateBatchForm({ subjects, groups, teachers, onClose }: CreateBatchFormProps) {
    const [name, setName] = useState("");
    const [subjectId, setSubjectId] = useState("");
    const [groupId, setGroupId] = useState("");
    const [teacherId, setTeacherId] = useState("");
    const [days, setDays] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createBatchAction({
                name,
                subjectId: subjectId || null,
                groupId: groupId || null,
                teacherId: teacherId || null,
                days,
                startTime,
                endTime
            });
            onClose();
        } catch (error) {
            console.error(error);
            alert("Failed to create batch");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Create New Batch</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Batch Name</label>
                        <input
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Science Batch A"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Target Group (Optional)</label>
                            <select
                                value={groupId}
                                onChange={(e) => { setGroupId(e.target.value); if(e.target.value) setSubjectId(""); }}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">Select Group</option>
                                {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Subject (Optional)</label>
                            <select
                                value={subjectId}
                                onChange={(e) => { setSubjectId(e.target.value); if(e.target.value) setGroupId(""); }}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                            >
                                <option value="">Select Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Teacher</label>
                        <select
                            value={teacherId}
                            onChange={(e) => setTeacherId(e.target.value)}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Select Teacher (Optional)</option>
                            {teachers.map(t => <option key={t.id} value={t.id}>{t.user.name}</option>)}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Class Days</label>
                        <input
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            placeholder="e.g. Sun, Tue, Thu"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">Start Time</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium">End Time</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                            />
                        </div>
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
                            disabled={loading}
                            className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                            Create Batch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

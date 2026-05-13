"use client";

import { useState } from "react";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { UserPlus, GraduationCap, School, Check, X, Loader2 } from "lucide-react";
import { assignAsStudentAction, assignAsTeacherAction } from "../actions/registration-actions";

interface RegistrationListProps {
    initialUsers: any[];
    groups: any[];
}

export function RegistrationList({ initialUsers, groups }: RegistrationListProps) {
    const [users, setUsers] = useState(initialUsers);
    const [processingId, setProcessingId] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);
    const [assignMode, setAssignMode] = useState<"STUDENT" | "TEACHER" | null>(null);

    // Form states
    const [college, setCollege] = useState("");
    const [groupId, setGroupId] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [qualification, setQualification] = useState("");

    const handleAssignStudent = async () => {
        if (!selectedUser) return;
        setProcessingId(selectedUser.id);
        try {
            await assignAsStudentAction(selectedUser.id, { college, groupId });
            setUsers(users.filter(u => u.id !== selectedUser.id));
            resetState();
        } catch (error) {
            console.error(error);
            alert("Failed to assign student");
        } finally {
            setProcessingId(null);
        }
    };

    const handleAssignTeacher = async () => {
        if (!selectedUser) return;
        setProcessingId(selectedUser.id);
        try {
            await assignAsTeacherAction(selectedUser.id, { specialization, qualification });
            setUsers(users.filter(u => u.id !== selectedUser.id));
            resetState();
        } catch (error) {
            console.error(error);
            alert("Failed to assign teacher");
        } finally {
            setProcessingId(null);
        }
    };

    const resetState = () => {
        setSelectedUser(null);
        setAssignMode(null);
        setCollege("");
        setGroupId("");
        setSpecialization("");
        setQualification("");
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead className="border-b bg-gray-50 font-medium text-gray-700">
                    <tr>
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Registered</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{user.name}</div>
                                <div className="text-gray-500">{user.email}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {user.phone || "No phone"}
                            </td>
                            <td className="px-6 py-4 text-gray-500">
                                {format(new Date(user.createdAt), "MMM d, yyyy")}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => { setSelectedUser(user); setAssignMode("STUDENT"); }}
                                        className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                                    >
                                        <GraduationCap className="h-3.5 w-3.5" />
                                        As Student
                                    </button>
                                    <button
                                        onClick={() => { setSelectedUser(user); setAssignMode("TEACHER"); }}
                                        className="inline-flex items-center gap-1 rounded-md bg-green-50 px-2.5 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100"
                                    >
                                        <UserPlus className="h-3.5 w-3.5" />
                                        As Teacher
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Assignment Modal/Overlay */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Assign {selectedUser.name} as {assignMode === "STUDENT" ? "Student" : "Teacher"}
                            </h2>
                            <button onClick={resetState} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {assignMode === "STUDENT" ? (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Academic Group</label>
                                        <select
                                            value={groupId}
                                            onChange={(e) => setGroupId(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Select Group (Optional)</option>
                                            {groups.map((g) => (
                                                <option key={g.id} value={g.id}>{g.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">College/School</label>
                                        <input
                                            type="text"
                                            value={college}
                                            onChange={(e) => setCollege(e.target.value)}
                                            placeholder="e.g. Dhaka College"
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Specialization</label>
                                        <input
                                            type="text"
                                            value={specialization}
                                            onChange={(e) => setSpecialization(e.target.value)}
                                            placeholder="e.g. Mathematics, Physics"
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Qualification</label>
                                        <input
                                            type="text"
                                            value={qualification}
                                            onChange={(e) => setQualification(e.target.value)}
                                            placeholder="e.g. BSc in Physics, DU"
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={resetState}
                                    className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={assignMode === "STUDENT" ? handleAssignStudent : handleAssignTeacher}
                                    disabled={processingId !== null}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {processingId ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Check className="h-4 w-4" />
                                            Confirm Assignment
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

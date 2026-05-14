"use client";

import { useState } from "react";
import { NoticeList } from "./notice-list";
import { NoticeForm } from "./notice-form";
import { Plus, Bell } from "lucide-react";

interface NoticeBoardProps {
    notices: any[];
    currentUserId?: string;
    currentUserRole?: string;
}

export function NoticeBoard({ notices, currentUserId, currentUserRole }: NoticeBoardProps) {
    const [showForm, setShowForm] = useState(false);
    const canPost = ["ADMIN", "MANAGER", "TEACHER"].includes(currentUserRole || "");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Bell className="h-6 w-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Notice Board</h2>
                        <p className="text-sm text-gray-500">Latest announcements and updates.</p>
                    </div>
                </div>
                {canPost && (
                    <button
                        onClick={() => setShowForm(true)}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-all hover:-translate-y-0.5"
                    >
                        <Plus className="h-4 w-4" />
                        Post Notice
                    </button>
                )}
            </div>

            <NoticeList notices={notices} currentUserId={currentUserId} currentUserRole={currentUserRole} />

            {showForm && <NoticeForm onClose={() => setShowForm(false)} />}
        </div>
    );
}

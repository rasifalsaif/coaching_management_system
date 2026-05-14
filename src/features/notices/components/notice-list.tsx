"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Bell, Trash2, User, Globe, Loader2 } from "lucide-react";
import { deleteNoticeAction } from "../actions/notice-actions";

interface NoticeListProps {
    notices: any[];
    currentUserId?: string;
    currentUserRole?: string;
}

export function NoticeList({ notices, currentUserId, currentUserRole }: NoticeListProps) {
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this notice?")) return;
        setLoadingId(id);
        try {
            await deleteNoticeAction(id);
        } catch (error) {
            alert("Failed to delete notice");
        } finally {
            setLoadingId(null);
        }
    };

    const canDelete = (notice: any) => {
        if (["ADMIN", "MANAGER"].includes(currentUserRole || "")) return true;
        if (currentUserRole === "TEACHER" && notice.teacher?.userId === currentUserId) return true;
        return false;
    };

    if (notices.length === 0) {
        return (
            <div className="flex h-40 flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 text-gray-500">
                <Bell className="mb-2 h-8 w-8 text-gray-300" />
                <p>No active notices at the moment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {notices.map((notice) => (
                <div key={notice.id} className="relative rounded-xl border bg-white p-5 shadow-sm transition-all hover:shadow-md">
                    <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-2">
                            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${notice.isGlobal ? "bg-blue-50 text-blue-600" : "bg-orange-50 text-orange-600"}`}>
                                {notice.isGlobal ? <Globe className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{notice.title}</h3>
                                <div className="flex items-center gap-2 text-[10px] font-medium text-gray-500 uppercase tracking-wider">
                                    <span>{format(new Date(notice.createdAt), "MMM d, yyyy • h:mm a")}</span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {notice.teacher?.user.name || "Administration"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {canDelete(notice) && (
                            <button
                                onClick={() => handleDelete(notice.id)}
                                disabled={loadingId === notice.id}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                {loadingId === notice.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                            </button>
                        )}
                    </div>
                    <p className="whitespace-pre-wrap text-sm text-gray-600 leading-relaxed">
                        {notice.content}
                    </p>
                </div>
            ))}
        </div>
    );
}

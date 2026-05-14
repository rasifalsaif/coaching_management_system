"use client";

import { useState } from "react";
import { createNoticeAction } from "../actions/notice-actions";
import { Loader2, Send, X, Globe, Lock } from "lucide-react";

interface NoticeFormProps {
    onClose: () => void;
}

export function NoticeForm({ onClose }: NoticeFormProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isGlobal, setIsGlobal] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createNoticeAction({ title, content, isGlobal });
            onClose();
        } catch (error) {
            alert("Failed to post notice");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Post New Notice</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Notice Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Eid Holiday Announcement"
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium">Content</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your announcement here..."
                            rows={4}
                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-3">
                        <div className="flex items-center gap-2">
                            {isGlobal ? <Globe className="h-4 w-4 text-blue-600" /> : <Lock className="h-4 w-4 text-orange-600" />}
                            <span className="text-sm font-medium text-gray-700">
                                {isGlobal ? "Public (Everyone can see)" : "Internal Only"}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsGlobal(!isGlobal)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isGlobal ? "bg-blue-600" : "bg-gray-200"}`}
                        >
                            <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isGlobal ? "translate-x-5" : "translate-x-0"}`} />
                        </button>
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
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            Post Notice
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

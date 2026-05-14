import { getSession } from "@/lib/auth-client";
import { getNoticesAction } from "@/features/notices/actions/notice-actions";
import { NoticeBoard } from "@/features/notices/components/notice-board";
import { redirect } from "next/navigation";

export default async function NoticesPage() {
    const session = await getSession();
    if (!session) {
        redirect("/login");
    }

    const notices = await getNoticesAction();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notice Board</h1>
                <p className="text-muted-foreground">
                    Stay updated with the latest announcements from the administration.
                </p>
            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">
                <NoticeBoard 
                    notices={notices} 
                    currentUserId={session.user.id} 
                    currentUserRole={session.user.role} 
                />
            </div>
        </div>
    );
}

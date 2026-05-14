import { getNoticesAction } from "@/features/notices/actions/notice-actions";
import { format } from "date-fns";
import { Bell, ArrowRight, Presentation, ClipboardList } from "lucide-react";
import Link from "next/link";

export default async function TeacherDashboard() {
  const notices = await getNoticesAction();
  const latestNotices = notices.slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your batches, take attendance, and share updates.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <Presentation className="h-4 w-4" />
            Active Batches
          </div>
          <div className="text-2xl font-bold text-blue-600">3</div>
          <Link href="/dashboard/teacher/batches" className="text-xs text-blue-600 hover:underline mt-2 block">
            View Schedule
          </Link>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
            <ClipboardList className="h-4 w-4" />
            Today's Classes
          </div>
          <div className="text-2xl font-bold text-green-600">2</div>
          <Link href="/dashboard/teacher/attendance" className="text-xs text-blue-600 hover:underline mt-2 block">
            Mark Attendance
          </Link>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm row-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Recent Notices
            </h3>
            <Link href="/dashboard/notices" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {latestNotices.length > 0 ? (
              latestNotices.map((notice) => (
                <div key={notice.id} className="border-l-4 border-blue-500 bg-gray-50 p-3 rounded-r-lg">
                  <h4 className="font-semibold text-xs line-clamp-1">{notice.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2">{notice.content}</p>
                  <span className="text-[10px] text-gray-400 mt-2 block">
                    {format(new Date(notice.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic">No notices posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { getNoticesAction } from "@/features/notices/actions/notice-actions";
import { ManagementService } from "@/services/management-service";
import { getFinancialStats } from "@/features/finance/services/finance-service";
import { format } from "date-fns";
import { Bell, ArrowRight, TrendingUp, Users, Presentation, BookOpen, CreditCard } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const [notices, stats, finance] = await Promise.all([
    getNoticesAction(),
    ManagementService.getDashboardStats(),
    getFinancialStats()
  ]);

  const latestNotices = notices.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of coaching operations and financial health.
          </p>
        </div>
        <div className="hidden md:block">
            <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {format(new Date(), "EEEE, MMMM do, yyyy")}
            </span>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Users className="h-5 w-5" />
            </div>
            <div className="text-sm font-medium text-gray-500">Total Students</div>
          </div>
          <div className="mt-4 text-2xl font-bold">{stats.studentCount}</div>
        </div>
        
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
                <Presentation className="h-5 w-5" />
            </div>
            <div className="text-sm font-medium text-gray-500">Active Teachers</div>
          </div>
          <div className="mt-4 text-2xl font-bold">{stats.teacherCount}</div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                <BookOpen className="h-5 w-5" />
            </div>
            <div className="text-sm font-medium text-gray-500">Ongoing Batches</div>
          </div>
          <div className="mt-4 text-2xl font-bold">{stats.batchCount}</div>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <CreditCard className="h-5 w-5" />
            </div>
            <div className="text-sm font-medium text-gray-500">Pending Dues</div>
          </div>
          <div className="mt-4 text-2xl font-bold">৳ {stats.pendingAmount.toLocaleString()}</div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Financial Trends Card */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Collection Trends
                </h3>
                <div className="text-xs text-gray-500 font-medium">Last 6 Months</div>
            </div>
            
            <div className="flex h-64 items-end justify-between gap-2 pt-4">
                {finance.chartData.length > 0 ? (
                    finance.chartData.map((item) => {
                        const maxVal = Math.max(...finance.chartData.map(d => d.total));
                        const height = maxVal > 0 ? (item.total / maxVal) * 100 : 0;
                        
                        return (
                            <div key={item.name} className="flex flex-1 flex-col items-center gap-2 group">
                                <div className="relative w-full flex flex-col items-center">
                                    <div 
                                        style={{ height: `${height}%` }}
                                        className="w-full max-w-[40px] rounded-t-md bg-blue-500 group-hover:bg-blue-600 transition-all duration-300 relative"
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-gray-900 px-2 py-1 text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            ৳ {item.total.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-[10px] font-medium text-gray-500 uppercase tracking-tighter">
                                    {item.name}
                                </span>
                            </div>
                        );
                    })
                ) : (
                    <div className="w-full flex flex-col items-center justify-center text-gray-400 italic">
                        No financial data available to display.
                    </div>
                )}
            </div>
        </div>

        {/* Notices Card */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
              <Bell className="h-5 w-5 text-blue-600" />
              Notices
            </h3>
            <Link href="/dashboard/notices" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {latestNotices.length > 0 ? (
              latestNotices.map((notice) => (
                <div key={notice.id} className="border-l-4 border-blue-500 bg-gray-50 p-3 rounded-r-lg hover:bg-gray-100 transition-colors">
                  <h4 className="font-semibold text-sm line-clamp-1">{notice.title}</h4>
                  <p className="text-[11px] text-gray-500 mt-1 line-clamp-2 leading-relaxed">{notice.content}</p>
                  <span className="text-[10px] text-gray-400 mt-2 block font-medium">
                    {format(new Date(notice.createdAt), "MMM d, yyyy")}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 italic py-4">No notices posted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

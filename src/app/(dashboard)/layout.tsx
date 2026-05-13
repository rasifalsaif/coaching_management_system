import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/sidebar";
import { UserCircle } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Hidden on mobile, shown on md and up */}
      <div className="hidden md:flex md:flex-shrink-0">
        <Sidebar role={session.user.role || "USER"} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b bg-white px-6 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold">C</span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-gray-900">
              CCMS Dashboard
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-gray-900">
                {session.user.name}
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                {session.user.role}
              </span>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center border text-gray-500">
                {session.user.image ? (
                    <img src={session.user.image} alt={session.user.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                    <UserCircle className="h-6 w-6" />
                )}
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto max-w-7xl">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
}

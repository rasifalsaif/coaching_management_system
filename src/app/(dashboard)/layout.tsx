import { getSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

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
    <div className="flex min-h-screen flex-col">
      {/* Shared Dashboard Header */}
      <header className="border-b bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">
            Coaching Center LMS
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.name} ({session.user.role})
            </span>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Shared Sidebar placeholder */}
        <aside className="w-64 border-r bg-muted/30 p-4 hidden md:block">
          <nav className="space-y-2">
            <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">
              Menu
            </div>
            {/* Nav items will go here based on role */}
          </nav>
        </aside>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

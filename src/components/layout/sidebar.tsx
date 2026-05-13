"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_CONFIG } from "./nav-config";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

interface SidebarProps {
    role: string;
}

export function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const navItems = NAV_CONFIG[role] || NAV_CONFIG["USER"];

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login");
        router.refresh();
    };

    return (
        <aside className="flex h-full w-64 flex-col border-r bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                <nav className="mt-5 flex-1 space-y-1 px-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        
                        return (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    isActive
                                        ? "bg-blue-50 text-blue-700"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium transition-colors"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500",
                                        "mr-3 h-5 w-5 flex-shrink-0"
                                    )}
                                    aria-hidden="true"
                                />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            
            <div className="flex flex-shrink-0 border-t p-4">
                <button
                    onClick={handleLogout}
                    className="group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                >
                    <LogOut
                        className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-red-500"
                        aria-hidden="true"
                    />
                    Logout
                </button>
            </div>
        </aside>
    );
}

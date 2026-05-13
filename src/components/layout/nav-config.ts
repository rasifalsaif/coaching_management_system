import { 
    LayoutDashboard, 
    Users, 
    UserPlus, 
    BookOpen, 
    CreditCard, 
    Settings, 
    Bell, 
    ClipboardList,
    LogOut,
    UserCircle,
    GraduationCap,
    Presentation
} from "lucide-react";

export type NavItem = {
    title: string;
    href: string;
    icon: any;
};

export const NAV_CONFIG: Record<string, NavItem[]> = {
    ADMIN: [
        { title: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
        { title: "New Registrations", href: "/dashboard/admin/registrations", icon: UserPlus },
        { title: "Students", href: "/dashboard/admin/students", icon: GraduationCap },
        { title: "Teachers", href: "/dashboard/admin/teachers", icon: Presentation },
        { title: "Fee Config", href: "/dashboard/admin/finance", icon: CreditCard },
        { title: "Subjects & Groups", href: "/dashboard/admin/academics", icon: BookOpen },
        { title: "Settings", href: "/dashboard/admin/settings", icon: Settings },
    ],
    MANAGER: [
        { title: "Overview", href: "/dashboard/manager", icon: LayoutDashboard },
        { title: "New Registrations", href: "/dashboard/admin/registrations", icon: UserPlus },
        { title: "Students", href: "/dashboard/admin/students", icon: GraduationCap },
        { title: "Finance", href: "/dashboard/admin/finance", icon: CreditCard },
    ],
    TEACHER: [
        { title: "My Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
        { title: "My Batches", href: "/dashboard/teacher/batches", icon: Presentation },
        { title: "Attendance", href: "/dashboard/teacher/attendance", icon: ClipboardList },
        { title: "Notices", href: "/dashboard/teacher/notices", icon: Bell },
        { title: "My Profile", href: "/dashboard/teacher/profile", icon: UserCircle },
    ],
    STUDENT: [
        { title: "My Dashboard", href: "/dashboard/student", icon: LayoutDashboard },
        { title: "My Finance", href: "/dashboard/student/finance", icon: CreditCard },
        { title: "My Results", href: "/dashboard/student/results", icon: GraduationCap },
        { title: "My Schedule", href: "/dashboard/student/schedule", icon: ClipboardList },
        { title: "Profile", href: "/dashboard/student/profile", icon: UserCircle },
    ],
    USER: [
        { title: "Status", href: "/dashboard/user", icon: LayoutDashboard },
        { title: "Complete Profile", href: "/dashboard/user/profile", icon: UserCircle },
    ]
};

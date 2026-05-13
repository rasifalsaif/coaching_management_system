import Link from "next/link";
import { GraduationCap, LogIn } from "lucide-react";

export function PublicHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">C</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gray-900">CCMS</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <Link href="#features" className="hover:text-blue-600 transition-colors">Courses</Link>
                    <Link href="#teachers" className="hover:text-blue-600 transition-colors">Teachers</Link>
                    <Link href="#about" className="hover:text-blue-600 transition-colors">About Us</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <Link 
                        href="/login" 
                        className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        <LogIn className="h-4 w-4" />
                        Login
                    </Link>
                    <Link 
                        href="/register" 
                        className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-shadow hover:shadow-lg"
                    >
                        <GraduationCap className="h-4 w-4" />
                        Apply Now
                    </Link>
                </div>
            </div>
        </header>
    );
}

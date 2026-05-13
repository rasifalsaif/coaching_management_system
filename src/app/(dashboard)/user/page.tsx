import { authClient } from "@/lib/client-auth";
import { getSession } from "@/lib/auth-client";
import { Clock, CheckCircle2, UserCircle } from "lucide-react";

export default async function UserDashboard() {
    const session = await getSession();

    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
            <div className="mb-6 rounded-full bg-blue-50 p-6">
                <Clock className="h-12 w-12 text-blue-600" />
            </div>
            
            <h1 className="mb-2 text-3xl font-bold tracking-tight">Welcome, {session?.user.name}!</h1>
            <p className="mb-8 max-w-md text-lg text-muted-foreground">
                Your account has been created successfully. A manager is currently reviewing your registration to assign your role.
            </p>

            <div className="grid w-full max-w-lg gap-4 text-left md:grid-cols-2">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                    <div className="mb-2 flex items-center gap-2 font-semibold">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                        Account Created
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Your public profile is active. You can now be found by our administration.
                    </p>
                </div>
                <div className="rounded-lg border bg-card p-4 shadow-sm opacity-50">
                    <div className="mb-2 flex items-center gap-2 font-semibold">
                        <div className="h-5 w-5 rounded-full border-2 border-dashed border-gray-400" />
                        Role Assignment
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Waiting for manager to assign you as a Student or Teacher.
                    </p>
                </div>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
                <p>Need help? Contact our support at support@coaching.com</p>
            </div>
        </div>
    );
}

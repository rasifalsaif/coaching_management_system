"use client";

import { useState } from "react";
import { authClient } from "@/lib/client-auth";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, User, UserPlus } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: authError } = await authClient.signUp.email({
                email,
                password,
                name,
                callbackURL: "/dashboard",
            });

            if (authError) {
                setError(authError.message || "Failed to register");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleRegister} className="space-y-4">
            {error && (
                <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}
            
            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>
                <p className="text-[10px] text-gray-500">Minimum 6 characters required.</p>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <UserPlus className="h-4 w-4" />
                )}
                Create Account
            </button>

            <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:underline">
                    Login here
                </Link>
            </p>
        </form>
    );
}

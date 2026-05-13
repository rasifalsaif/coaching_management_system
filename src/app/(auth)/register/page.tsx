import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-white p-8 shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Create an Account</h1>
          <p className="text-sm text-gray-500 mt-2">
            Join our coaching center to start your learning journey.
          </p>
        </div>
        
        <RegisterForm />
      </div>
    </div>
  );
}

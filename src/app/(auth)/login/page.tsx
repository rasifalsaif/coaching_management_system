export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl border bg-card p-8 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to your coaching account
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-md text-sm text-center">
             Auth implementation using <strong>Better Auth</strong> will be wired here.
          </div>
          
          <button className="w-full rounded-md bg-primary px-4 py-2 text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            Login Placeholder
          </button>
        </div>
      </div>
    </div>
  );
}

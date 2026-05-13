export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
        <p className="text-muted-foreground">
          Track your classes, results, and payments here.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Upcoming Classes</h3>
          <p className="text-sm text-muted-foreground italic">No classes scheduled for today.</p>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <h3 className="font-semibold mb-4">Recent Results</h3>
          <p className="text-sm text-muted-foreground italic">No new results published.</p>
        </div>
      </div>
    </div>
  );
}

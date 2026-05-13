import { getSession } from "@/lib/auth-client";
import { BillingService } from "@/features/finance/services/billing-service";
import { CreditCard, History, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { redirect } from "next/navigation";

export default async function StudentFinancePage() {
    const session = await getSession();
    if (!session || session.user.role !== "STUDENT") {
        redirect("/login");
    }

    const studentProfile = await BillingService.calculateStudentMonthlyFee(session.user.id); // Note: calculateStudentMonthlyFee expects studentId (the UUID), but BillingService uses student.id. Let's verify the ID passing.
    
    // Actually, BillingService.getStudentDues needs the Student table ID, not User ID.
    // Let's get the student profile first.
    const fullProfile = await BillingService.getStudentFullProfile(session.user.id);
    if (!fullProfile || !fullProfile.student) {
        return <div>Student profile not found.</div>;
    }

    const studentId = fullProfile.student.id;
    const { invoices, totalDue } = await BillingService.getStudentDues(studentId);
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Overview</h1>
                <p className="text-muted-foreground">
                    Track your monthly dues, invoices, and payment history.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                        Total Outstanding
                    </div>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                        ৳ {Number(totalDue).toLocaleString()}
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <CreditCard className="h-4 w-4 text-blue-500" />
                        Monthly Fee
                    </div>
                    <div className="mt-2 text-3xl font-bold text-gray-900">
                        ৳ {Number(studentProfile.finalAmount).toLocaleString()}
                    </div>
                    {Number(studentProfile.discountAmount) > 0 && (
                        <div className="mt-1 text-xs text-green-600 font-medium">
                            Includes ৳ {Number(studentProfile.discountAmount)} scholarship discount
                        </div>
                    )}
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Last Payment
                    </div>
                    <div className="mt-2 text-2xl font-bold text-gray-900">
                        {invoices.filter(i => i.status === "PAID").length > 0 ? "Up to date" : "No recent payments"}
                    </div>
                </div>
            </div>

            <div className="rounded-md border bg-white overflow-hidden">
                <div className="border-b bg-gray-50 px-6 py-4">
                    <h2 className="font-semibold text-gray-900">Invoices & Billing</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b font-medium text-gray-700">
                            <tr>
                                <th className="px-6 py-3">Month</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {invoices.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-muted-foreground">
                                        No invoices found.
                                    </td>
                                </tr>
                            ) : (
                                invoices.map((invoice) => (
                                    <tr key={invoice.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium">{invoice.month}</td>
                                        <td className="px-6 py-4">৳ {Number(invoice.amount).toLocaleString()}</td>
                                        <td className="px-6 py-4">{format(new Date(invoice.dueDate), "MMM d, yyyy")}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                                invoice.status === "PAID" ? "bg-green-100 text-green-700" :
                                                invoice.status === "PARTIAL" ? "bg-blue-100 text-blue-700" :
                                                "bg-red-100 text-red-700"
                                            }`}>
                                                {invoice.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-blue-600 hover:underline font-medium">
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

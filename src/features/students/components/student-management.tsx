"use client";

import { useState } from "react";
import { updateStudentCustomFeeAction, recordOfflinePaymentAction } from "../actions/student-actions";
import { Loader2, Check, X, DollarSign, CreditCard } from "lucide-react";

interface StudentManagementProps {
    students: any[];
}

export function StudentManagement({ students }: StudentManagementProps) {
    const [selectedStudent, setSelectedStudent] = useState<any | null>(null);
    const [actionType, setActionType] = useState<"FEE" | "PAYMENT" | null>(null);
    const [loading, setLoading] = useState(false);

    // Fee state
    const [customFee, setCustomFee] = useState("");

    // Payment state
    const [selectedInvoice, setSelectedInvoice] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const handleUpdateFee = async () => {
        setLoading(true);
        try {
            await updateStudentCustomFeeAction(selectedStudent.id, customFee === "" ? null : parseFloat(customFee));
            reset();
        } catch (error) {
            alert("Failed to update fee");
        } finally {
            setLoading(false);
        }
    };

    const handleRecordPayment = async () => {
        setLoading(true);
        try {
            await recordOfflinePaymentAction({
                studentId: selectedStudent.id,
                invoiceId: selectedInvoice,
                amount: parseFloat(paymentAmount),
                method: paymentMethod
            });
            reset();
        } catch (error) {
            alert("Failed to record payment");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setSelectedStudent(null);
        setActionType(null);
        setCustomFee("");
        setSelectedInvoice("");
        setPaymentAmount("");
        setLoading(false);
    };

    return (
        <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="border-b bg-gray-50/50 font-medium text-gray-700">
                        <tr>
                            <th className="px-6 py-3">Student Name</th>
                            <th className="px-6 py-3">Student ID</th>
                            <th className="px-6 py-3">Group</th>
                            <th className="px-6 py-3">Custom Fee</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium">{student.user.name}</td>
                                <td className="px-6 py-4 font-mono text-xs">{student.studentId}</td>
                                <td className="px-6 py-4">{student.group?.name || "N/A"}</td>
                                <td className="px-6 py-4">
                                    {student.customMonthlyFee ? (
                                        <span className="font-bold text-blue-600">৳ {Number(student.customMonthlyFee)}</span>
                                    ) : (
                                        <span className="text-gray-400 italic">Default</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => { setSelectedStudent(student); setActionType("FEE"); setCustomFee(student.customMonthlyFee ? student.customMonthlyFee.toString() : ""); }}
                                            className="inline-flex items-center gap-1 rounded-md bg-gray-100 px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-200"
                                        >
                                            <DollarSign className="h-3.5 w-3.5" />
                                            Set Fee
                                        </button>
                                        <button 
                                            onClick={() => { setSelectedStudent(student); setActionType("PAYMENT"); }}
                                            className="inline-flex items-center gap-1 rounded-md bg-green-100 px-2.5 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-200"
                                        >
                                            <CreditCard className="h-3.5 w-3.5" />
                                            Pay
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedStudent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                {actionType === "FEE" ? "Update Monthly Fee" : "Record Offline Payment"}
                            </h2>
                            <button onClick={reset} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
                        </div>
                        <p className="mb-4 text-sm text-gray-500 font-medium">Student: {selectedStudent.user.name}</p>

                        <div className="space-y-4">
                            {actionType === "FEE" ? (
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium">Custom Monthly Fee (৳)</label>
                                    <input 
                                        type="number"
                                        value={customFee}
                                        onChange={(e) => setCustomFee(e.target.value)}
                                        placeholder="Enter amount (leave empty for default)"
                                        className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                    />
                                    <p className="text-[10px] text-gray-400 italic">This overrides the group/subject base fees and scholarship discounts.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Select Invoice</label>
                                        <select 
                                            value={selectedInvoice}
                                            onChange={(e) => {
                                                setSelectedInvoice(e.target.value);
                                                const inv = selectedStudent.invoices.find((i:any) => i.id === e.target.value);
                                                if (inv) setPaymentAmount(inv.amount.toString());
                                            }}
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="">Select an invoice...</option>
                                            {selectedStudent.invoices.filter((i:any) => i.status !== "PAID").map((inv:any) => (
                                                <option key={inv.id} value={inv.id}>{inv.month} - ৳ {Number(inv.amount)}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Amount Paid (৳)</label>
                                        <input 
                                            type="number"
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-sm font-medium">Payment Method</label>
                                        <select 
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none"
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="bKash">bKash (Offline)</option>
                                            <option value="Nagad">Nagad (Offline)</option>
                                            <option value="Bank">Bank Transfer</option>
                                        </select>
                                    </div>
                                </>
                            )}

                            <div className="flex gap-3 pt-4">
                                <button onClick={reset} className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                                <button 
                                    onClick={actionType === "FEE" ? handleUpdateFee : handleRecordPayment}
                                    disabled={loading || (actionType === "PAYMENT" && !selectedInvoice)}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

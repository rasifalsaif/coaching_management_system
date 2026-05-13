"use client";

import { useState } from "react";
import { saveFeeConfigAction } from "@/features/finance/actions/finance-actions";
import { Loader2, Save, CheckCircle2 } from "lucide-react";

interface FeeConfigListProps {
    items: { id: string; name: string }[];
    type: "GROUP" | "SUBJECT";
    initialConfigs: any[];
}

export function FeeConfigList({ items, type, initialConfigs }: FeeConfigListProps) {
    const [configs, setConfigs] = useState<Record<string, string>>(
        initialConfigs.reduce((acc, c) => ({ ...acc, [c.targetId]: c.amount.toString() }), {})
    );
    const [savingId, setSavingId] = useState<string | null>(null);
    const [successId, setSuccessId] = useState<string | null>(null);

    const handleSave = async (targetId: string) => {
        const amount = parseFloat(configs[targetId] || "0");
        if (isNaN(amount) || amount < 0) {
            alert("Please enter a valid amount");
            return;
        }

        setSavingId(targetId);
        setSuccessId(null);
        
        try {
            await saveFeeConfigAction({
                type,
                targetId,
                amount
            });
            setSuccessId(targetId);
            setTimeout(() => setSuccessId(null), 3000);
        } catch (error) {
            console.error(error);
            alert("Failed to save fee configuration");
        } finally {
            setSavingId(null);
        }
    };

    const handleInputChange = (targetId: string, value: string) => {
        setConfigs(prev => ({ ...prev, [targetId]: value }));
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
                <thead>
                    <tr className="border-b text-gray-500 font-medium">
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3 w-48">Base Monthly Fee (৳)</th>
                        <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-4 py-4 font-medium text-gray-900">{item.name}</td>
                            <td className="px-4 py-4">
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">৳</span>
                                    <input
                                        type="number"
                                        value={configs[item.id] || ""}
                                        onChange={(e) => handleInputChange(item.id, e.target.value)}
                                        placeholder="0.00"
                                        className="w-full rounded-md border border-gray-300 py-1.5 pl-7 pr-3 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </td>
                            <td className="px-4 py-4 text-right">
                                <button
                                    onClick={() => handleSave(item.id)}
                                    disabled={savingId === item.id}
                                    className={`inline-flex items-center gap-2 rounded-md px-4 py-1.5 text-sm font-semibold transition-all ${
                                        successId === item.id
                                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                                            : "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                                    }`}
                                >
                                    {savingId === item.id ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : successId === item.id ? (
                                        <CheckCircle2 className="h-4 w-4" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    {successId === item.id ? "Saved" : "Save"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

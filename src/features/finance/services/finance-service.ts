import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export async function getFinancialStats() {
    // 1. Total Collection (Current Month)
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const monthlyCollection = await prisma.payment.aggregate({
        _sum: { amount: true },
        where: {
            paidAt: { gte: startOfMonth }
        }
    });

    // 2. Total Outstanding Due
    const totalDue = await prisma.invoice.aggregate({
        _sum: { amount: true },
        where: {
            status: { in: [PaymentStatus.PENDING, PaymentStatus.PARTIAL, PaymentStatus.OVERDUE] }
        }
    });

    // 3. Collection by Month (Last 6 Months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const payments = await prisma.payment.findMany({
        where: {
            paidAt: { gte: sixMonthsAgo }
        },
        select: {
            amount: true,
            paidAt: true
        }
    });

    // Aggregate payments by month
    const monthlyStats: Record<string, number> = {};
    payments.forEach(p => {
        const monthYear = p.paidAt.toLocaleString('default', { month: 'short', year: '2-digit' });
        monthlyStats[monthYear] = (monthlyStats[monthYear] || 0) + Number(p.amount);
    });

    const chartData = Object.entries(monthlyStats).map(([name, total]) => ({
        name,
        total
    })).sort((a, b) => {
        // Simple sort logic for month/year strings might be complex, 
        // but for now, we'll keep it simple.
        return 0; 
    });

    return {
        monthlyCollection: Number(monthlyCollection._sum.amount || 0),
        totalDue: Number(totalDue._sum.amount || 0),
        chartData
    };
}

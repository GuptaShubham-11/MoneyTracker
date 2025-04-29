import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/transaction';
import Budget from '@/lib/models/budget';
import { connectDB } from '@/lib/db';

// Helper: Get start and end date for a month
function getMonthRange(month) {
    const start = new Date(`${month}-01T00:00:00.000Z`);
    const end = new Date(start);
    end.setMonth(end.getMonth() + 1);
    return { start, end };
}

// GET: Summary of transactions + budgets for a user
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const month = searchParams.get('month'); // Example: '2025-04'
        const ownerId = searchParams.get('ownerId');

        if (!ownerId) {
            return NextResponse.json({ message: 'Owner ID is required' }, { status: 400 });
        }
        if (!month) {
            return NextResponse.json({ message: 'Month is required' }, { status: 400 });
        }

        const { start, end } = getMonthRange(month);

        // Fetch transactions of the user within the month
        const transactions = await Transaction.find({
            ownerId,
            date: { $gte: start, $lt: end },
        }).sort({ date: -1 });

        // Fetch budgets of the user for the month
        const budgets = await Budget.find({
            ownerId,
            monthYear: month,
        });

        // Calculate total expenses
        const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

        // Calculate category-wise expenses
        const categoryExpenses = transactions.reduce((acc, tx) => {
            acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
            return acc;
        }, {});

        // Prepare budget comparison
        const budgetComparison = budgets.map((budget) => {
            const spent = categoryExpenses[budget.category] || 0;
            return {
                category: budget.category,
                budgeted: budget.amount,
                spent,
                remaining: budget.amount - spent,
            };
        });

        // Prepare monthly expenses (for charts, etc.)
        const monthlyExpenses = [{
            month,
            total: totalExpenses,
        }];

        return NextResponse.json({
            totalExpenses,
            categoryExpenses,
            budgets,
            budgetComparison,
            monthlyExpenses,
        }, { status: 200 });

    } catch (error) {
        console.error('GET summary error:', error);
        return NextResponse.json({ message: 'Failed to fetch summary' }, { status: 500 });
    }
}

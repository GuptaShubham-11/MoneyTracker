import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/transaction';
import Budget from '@/lib/models/budget';
import { connectDB } from '@/lib/db';


// GET: Summary of transactions + budgets
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const month = searchParams.get('month'); // Example: 2025-04

        if (!month) {
            return NextResponse.json({ message: 'Month is required' }, { status: 400 });
        }

        // Get transactions for the month
        const transactions = await Transaction.find({
            date: {
                $gte: new Date(`${month}-01`),
                $lt: new Date(`${month}-31`),
            },
        });

        // Get budgets for the month
        const budgets = await Budget.find({ monthYear: month });

        // Calculate total expenses
        const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);

        // Category-wise expenses
        const categoryExpenses = {};
        transactions.forEach((tx) => {
            if (!categoryExpenses[tx.category]) {
                categoryExpenses[tx.category] = 0;
            }
            categoryExpenses[tx.category] += tx.amount;
        });

        // Prepare budget vs spent comparison
        const budgetComparison = budgets.map((budget) => {
            const spent = categoryExpenses[budget.category] || 0;
            return {
                category: budget.category,
                budgeted: budget.amount,
                spent,
            };
        });

        return NextResponse.json({
            totalExpenses,
            categoryExpenses,
            budgets: budgets,
            budgetComparison,
            recentTransactions: transactions.slice(-5).reverse(), // Last 5 transactions
        }, { status: 200 });

    } catch (error) {
        console.error('GET summary error:', error);
        return NextResponse.json({ message: 'Failed to fetch summary' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/transaction';
import { connectDB } from '@/lib/db';

// GET: Fetch all transactions (optionally filter by month/year)
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const month = searchParams.get('month'); // format: "2025-04"

        let query = {};

        if (month) {
            const [year, monthNum] = month.split('-').map(Number);
            const start = new Date(year, monthNum - 1, 1);
            const end = new Date(year, monthNum, 1);

            query.date = { $gte: start, $lt: end };
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });
        return NextResponse.json({ transactions }, { status: 200 });

    } catch (error) {
        console.error('GET transactions error:', error);
        return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
    }
}

// POST: Add a new transaction
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { amount, description, date, category } = body;

        if (!amount || !date || !category) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newTransaction = await Transaction.create({
            amount,
            description,
            date,
            category,
        });

        return NextResponse.json({ transaction: newTransaction }, { status: 201 });

    } catch (error) {
        console.error('POST transaction error:', error);
        return NextResponse.json({ message: 'Failed to create transaction' }, { status: 500 });
    }
}

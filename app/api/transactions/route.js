import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/transaction';
import { connectDB } from '@/lib/db';

// Helper: Validate required fields
function validateTransactionFields({ amount, date, category, ownerId }) {
    return amount && date && category && ownerId;
}

// GET: Fetch all transactions (optionally filtered by month/year)
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get('ownerId');
        const month = searchParams.get('month'); // optional, format: "2025-04"

        if (!ownerId) {
            return NextResponse.json({ message: 'Missing ownerId' }, { status: 400 });
        }

        const query = { ownerId };

        if (month) {
            const [year, monthNum] = month.split('-').map(Number);
            const startOfMonth = new Date(year, monthNum - 1, 1);
            const endOfMonth = new Date(year, monthNum, 1);

            query.date = { $gte: startOfMonth, $lt: endOfMonth };
        }

        const transactions = await Transaction.find(query).sort({ date: -1 });

        return NextResponse.json({ transactions }, { status: 200 });

    } catch (error) {
        console.error('GET transactions error:', error);
        return NextResponse.json({ message: 'Failed to fetch transactions' }, { status: 500 });
    }
}

// POST: Create a new transaction
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { amount, description, date, category, ownerId } = body;

        if (!validateTransactionFields({ amount, date, category, ownerId })) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newTransaction = await Transaction.create({
            amount,
            description,
            date,
            category,
            ownerId,
        });

        return NextResponse.json({ transaction: newTransaction }, { status: 201 });

    } catch (error) {
        console.error('POST transaction error:', error);
        return NextResponse.json({ message: 'Failed to create transaction' }, { status: 500 });
    }
}

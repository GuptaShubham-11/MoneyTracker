import { NextResponse } from 'next/server';
import Budget from '@/lib/models/budget';
import { connectDB } from '@/lib/db';

// Helper: Validate budget creation fields
function validateBudgetFields({ category, amount, month, ownerId }) {
    return category && amount && month && ownerId;
}

// GET: Get all budgets for a month
export async function GET(req) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const ownerId = searchParams.get('ownerId');
        const month = searchParams.get('month'); // Example: '2025-04'

        if (!ownerId) {
            return NextResponse.json({ message: 'Owner ID is required' }, { status: 400 });
        }

        let budgets = [];

        if (month) {
            budgets = await Budget.find({
                ownerId,
                monthYear: month,
            });
        } else {
            budgets = await Budget.find({ ownerId });
        }

        return NextResponse.json({ budgets }, { status: 200 });

    } catch (error) {
        console.error('GET budgets error:', error);
        return NextResponse.json({ message: 'Failed to fetch budgets' }, { status: 500 });
    }
}

// POST: Set a new category budget
export async function POST(req) {
    try {
        await connectDB();

        const body = await req.json();
        const { category, amount, month, ownerId } = body;

        if (!validateBudgetFields({ category, amount, month, ownerId })) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const newBudget = await Budget.create({
            category,
            amount,
            monthYear: month,
            ownerId,
        });

        return NextResponse.json({ budget: newBudget }, { status: 201 });

    } catch (error) {
        console.error('POST budget error:', error);
        return NextResponse.json({ message: 'Failed to create budget' }, { status: 500 });
    }
}

import { NextResponse } from 'next/server';
import Budget from '@/lib/models/budget';
import { connectDB } from '@/lib/db';

// PUT: Update a budget
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const id = params.id;

        if (!id) {
            return NextResponse.json({ message: 'Budget ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const { category, amount, month } = body;

        if (!category || !amount || !month) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const updatedBudget = await Budget.findByIdAndUpdate(
            id,
            { category, amount, month },
            { new: true }
        );

        if (!updatedBudget) {
            return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
        }

        return NextResponse.json({ budget: updatedBudget }, { status: 200 });

    } catch (error) {
        console.error('PUT budget error:', error);
        return NextResponse.json({ message: 'Failed to update budget' }, { status: 500 });
    }
}

// DELETE: Delete a budget
export async function DELETE(_req, { params }) {
    try {
        await connectDB();

        const id = params.id;

        if (!id) {
            return NextResponse.json({ message: 'Budget ID is required' }, { status: 400 });
        }

        const deletedBudget = await Budget.findByIdAndDelete(id);

        if (!deletedBudget) {
            return NextResponse.json({ message: 'Budget not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Budget deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('DELETE budget error:', error);
        return NextResponse.json({ message: 'Failed to delete budget' }, { status: 500 });
    }
}

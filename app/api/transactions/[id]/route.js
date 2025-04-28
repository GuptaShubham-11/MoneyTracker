import { NextResponse } from 'next/server';
import Transaction from '@/lib/models/transaction';
import { connectDB } from '@/lib/db';

// Helper: Validate transaction update fields
function validateTransactionUpdate({ amount, date, category }) {
    return amount && date && category;
}

// PUT: Update a transaction by ID
export async function PUT(req, { params }) {
    try {
        await connectDB();

        const id = params?.id;

        if (!id) {
            return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 });
        }

        const body = await req.json();
        const { amount, description, date, category } = body;

        if (!validateTransactionUpdate({ amount, date, category })) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(
            id,
            { amount, description, date, category },
            { new: true }
        );

        if (!updatedTransaction) {
            return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({ transaction: updatedTransaction }, { status: 200 });

    } catch (error) {
        console.error('PUT transaction error:', error);
        return NextResponse.json({ message: 'Failed to update transaction' }, { status: 500 });
    }
}

// DELETE: Delete a transaction by ID
export async function DELETE(req, { params }) {
    try {
        await connectDB();

        const id = params?.id;

        if (!id) {
            return NextResponse.json({ message: 'Transaction ID is required' }, { status: 400 });
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Transaction deleted successfully' }, { status: 200 });

    } catch (error) {
        console.error('DELETE transaction error:', error);
        return NextResponse.json({ message: 'Failed to delete transaction' }, { status: 500 });
    }
}

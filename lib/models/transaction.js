import { Schema, model, models } from 'mongoose';

const transactionSchema = new Schema(
    {
        amount: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        date: {
            type: Date,
            required: true,
        },
        category: {
            type: String,
            required: true,
            trim: true,
        },
        ownerId: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { timestamps: true }
);

const Transaction = models.Transaction || model('Transaction', transactionSchema);
export default Transaction;
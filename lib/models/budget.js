import { Schema, model, models } from 'mongoose';

const budgetSchema = new Schema(
    {
        category: {
            type: String,
            required: true,
            trim: true,
        },
        monthYear: {
            type: String, // format: "2025-04"
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        ownerId: {
            type: String,
            required: true,
            trim: true,
        }
    },
    { timestamps: true }
);


const Budget = models.Budget || model('Budget', budgetSchema);
export default Budget;
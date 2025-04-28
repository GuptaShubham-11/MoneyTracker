"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Plus, Trash } from "lucide-react";
import { TransactionModal } from "./TransactionModal";
import { useState } from "react";
import { useBudget } from "@/context/ContextProvider";

export default function TransactionsList() {
    const [openModal, setOpenModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const { transactions, loading, addTransaction, editTransaction, deleteTransaction } = useBudget();

    const handleSave = async (data) => {
        if (editingTransaction?._id) {
            await editTransaction(editingTransaction._id, data);
        } else {
            await addTransaction(data);
        }
        setOpenModal(false);
        setEditingTransaction(null);
    };

    const handleEdit = (transaction) => {
        setEditingTransaction(transaction);
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        await deleteTransaction(id);
    };

    const handleClose = () => {
        setOpenModal(false);
        setEditingTransaction(null);
    };

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);
    };

    return (
        <Card className="bg-crd rounded-2xl shadow-md">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-txt font-semibold">Transactions</h2>
                    <Button
                        onClick={() => setOpenModal(true)}
                        variant="outline"
                        size="sm"
                        className="rounded-md"
                    >
                        <Plus className="h-4 w-4 mr-1" /> Add
                    </Button>

                    {/* Modal */}
                    <TransactionModal
                        open={openModal}
                        onClose={handleClose}
                        onSave={handleSave}
                        initialData={editingTransaction}
                    />
                </div>

                {/* Content */}
                {loading ? (
                    <div className="h-32 flex items-center justify-center text-second">
                        Loading...
                    </div>
                ) : transactions.length === 0 ? (
                    <div className="h-32 flex items-center justify-center text-second">
                        No transactions yet.
                    </div>
                ) : (
                    <div className="max-h-[400px] overflow-y-auto pr-2 custom-scroll">
                        <ul className="space-y-4">
                            {transactions.map((transaction) => (
                                <li
                                    key={transaction._id}
                                    className="flex items-center justify-between p-2 hover:bg-bg/30 rounded"
                                >
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-txt">{transaction.description}</span>
                                        <span className="text-xs text-second">{formatDate(transaction.date)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-red-400 font-bold">
                                            {formatCurrency(transaction.amount)}
                                        </span>
                                        <Button
                                            onClick={() => handleEdit(transaction)}
                                            size="icon"
                                            variant="ghost"
                                            className="h-7 w-7"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(transaction._id)}
                                            size="icon"
                                            variant="ghost"
                                            className="h-7 w-7"
                                        >
                                            <Trash className="h-4 w-4 text-red-500" />
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

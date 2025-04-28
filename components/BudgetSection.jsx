"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useBudget } from "@/context/ContextProvider";
import Spinner from "./Spinner";

export default function BudgetSection() {
    const { budgets, summary, loading, error, categories, createBudget, deleteBudget } = useBudget();

    const summaryData = summary?.budgetComparison || [];


    const [newCategory, setNewCategory] = useState("");
    const [newAmount, setNewAmount] = useState("");
    const [newMonth, setNewMonth] = useState("");
    const [creating, setCreating] = useState(false);

    const handleCreateBudget = async () => {
        if (!newCategory || !newAmount) return;

        setCreating(true);
        try {
            await createBudget({
                category: newCategory,
                amount: Number(newAmount),
                month: newMonth || new Date().toISOString().slice(0, 7),
            });
            setNewCategory("");
            setNewAmount("");
            setNewMonth("");
        } catch (err) {
            console.error("Failed to create budget:", err);
        } finally {
            setCreating(false);
        }
    };

    const handleDeleteBudget = async (budgetId) => {
        try {
            await deleteBudget(budgetId);
        } catch (err) {
            console.error("Failed to delete budget:", err);
        }
    };

    if (loading) return <Spinner />;
    if (error) return <div className="text-center text-red-400 py-10">{error}</div>;

    return (
        <section className="space-y-10">
            {/* Title */}
            <div className="text-center">
                <h2 className="text-3xl font-bold text-txt">Budgets Overview</h2>
                <p className="text-second mt-2">Track your planned vs actual expenses carefully.</p>
            </div>

            {/* Create Budget Section */}
            <Card className="bg-crd rounded-2xl shadow-lg">
                <CardContent className="p-8 space-y-8">
                    <div className="space-y-1 text-center">
                        <h3 className="text-2xl font-bold text-txt">Create a New Budget</h3>
                        <p className="text-second text-sm">Plan ahead by setting your budget for each category.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Select value={newCategory} onValueChange={setNewCategory}>
                            <SelectTrigger className="bg-crd text-txt h-12 py-2 rounded">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>
                                        {cat}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Input
                            type="number"
                            placeholder="Budget Amount"
                            value={newAmount}
                            onChange={(e) => setNewAmount(e.target.value)}
                            className="bg-crd text-txt h-12 rounded-lg"
                        />

                        <Input
                            type="month"
                            value={newMonth}
                            onChange={(e) => setNewMonth(e.target.value)}
                            className="bg-crd text-txt h-12 rounded-lg"
                        />
                    </div>

                    <div className="flex justify-center">
                        <Button
                            onClick={handleCreateBudget}
                            disabled={creating || !newCategory || !newAmount}
                            className="w-full md:w-auto bg-primary hover:bg-primary/80 rounded-lg text-white font-semibold px-6 py-3"
                        >
                            {creating ? "Creating..." : "Create Budget"}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Budgets List Section */}
            {(!budgets || budgets.length === 0) ? (
                <div className="text-center text-second py-10">
                    No budgets available.
                </div>
            ) : (
                <Card className="bg-crd rounded-2xl shadow-md">
                    <CardContent className="p-6 overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase text-txt border-b border-crd">
                                <tr>
                                    <th className="py-2 px-4">Category</th>
                                    <th className="py-2 px-4">Budgeted</th>
                                    <th className="py-2 px-4">Spent</th>
                                    <th className="py-2 px-4">Remaining</th>
                                    <th className="py-2 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {summaryData.map((summary) => {
                                    const isOverSpent = summary.budgeted < summary.spent;
                                    return (
                                        <tr key={summary._id} className="border-b border-crd text-txt last:border-none">
                                            <td className="py-3 px-4 font-semibold">{summary.category}</td>
                                            <td className="py-3 px-4">${summary.budgeted}</td>
                                            <td className="py-3 px-4">${summary.spent}</td>
                                            <td className={`py-3 px-4 font-semibold ${isOverSpent ? "text-red-400" : "text-green-400"}`}>
                                                {summary.remaining}
                                            </td>
                                            <td className="py-3 px-4 flex gap-2">
                                                <Button
                                                    variant="destructive"
                                                    size="sm"
                                                    onClick={() => handleDeleteBudget(summary._id)}
                                                    className="bg-red-500 hover:bg-red-600"
                                                >
                                                    Delete
                                                </Button>

                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            )}
        </section>
    );
}

'use client'
import { useBudget } from "@/context/ContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, UtensilsCrossed, PieChart, Clock, TrendingUp } from "lucide-react";

export default function SummaryCards() {
    const { summary } = useBudget();

    const cards = [
        {
            title: "Total Expenses",
            value: `$${summary?.totalExpenses || 0}`,
            icon: Wallet
        },
        {
            title: "Highest Category",
            value: `${Object.entries(summary?.categoryExpenses || {}).reduce(
                (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
                { category: "", amount: 0 }
            ).category} - $${Object.entries(summary?.categoryExpenses || {}).reduce(
                (max, [category, amount]) => (amount > max.amount ? { category, amount } : max),
                { category: "", amount: 0 }
            ).amount}`,
            icon: TrendingUp
        },
        {
            title: "Remaining Budget",
            value: `${summary?.budgetComparison?.reduce((acc, { budgeted, spent }) => acc + (budgeted - spent), 0) || 0
                } left`,
            icon: PieChart
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cards.map((card, idx) => (
                <Card key={idx} className="bg-crd rounded-2xl shadow-md">
                    <CardContent className="p-4 flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-txt">{card.title}</p>
                            <card.icon className="h-5 w-5 text-main" />
                        </div>
                        <h2 className="text-3xl text-txt font-bold">{card.value}</h2>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

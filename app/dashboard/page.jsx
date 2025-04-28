'use client';

import DashboardHeader from "@/components/DashboardHeader";
import SummaryCards from "@/components/SummaryCards";
import TransactionsList from "@/components/TransactionsList";
import ChartsSection from "@/components/ChartsSection";
import BudgetSection from "@/components/BudgetSection";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <DashboardHeader />
            <BudgetSection />
            <SummaryCards />
            <TransactionsList />
            <ChartsSection />
        </div>
    );
}

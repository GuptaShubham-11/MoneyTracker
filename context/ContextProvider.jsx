"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const BudgetContext = createContext();

export function useBudget() {
    return useContext(BudgetContext);
}

export function BudgetProvider({ children }) {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);
    const [summary, setSummary] = useState({
        totalExpenses: 0,
        categoryExpenses: {},
        budgets: [],
        budgetComparison: [],
        monthlyExpenses: [],
        recentTransactions: [],
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const categories = [
        "Food",
        "Travel",
        "Rent",
        "Entertainment",
        "Health",
        "Shopping",
        "Education",
        "Other",
    ];

    const getOwnerId = () => {
        const ownerId = localStorage.getItem("ownerId");
        if (!ownerId) {
            setError("Owner ID not found.");
        }
        return ownerId;
    };

    // --- API Callers ---

    const fetchTransactions = async (month = "") => {
        setLoading(true);
        try {
            const ownerId = getOwnerId();
            if (!ownerId) return;

            const res = await axios.get(`/api/transactions?ownerId=${ownerId}${month ? `&month=${month}` : ""}`);
            setTransactions(res.data.transactions || []);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load transactions.");
        } finally {
            setLoading(false);
        }
    };

    const fetchBudgets = async (month = new Date().toISOString().slice(0, 7)) => {
        setLoading(true);
        try {
            const ownerId = getOwnerId();
            if (!ownerId) return;

            const res = await axios.get(`/api/budgets?ownerId=${ownerId}${month ? `&month=${month}` : ""}`);
            setBudgets(res.data.budgets || []);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load budgets.");
        } finally {
            setLoading(false);
        }
    };

    const fetchSummary = async (month = new Date().toISOString().slice(0, 7)) => {
        setLoading(true);
        try {
            const res = await axios.get(`/api/summary?month=${month}`);
            const data = res.data;

            setSummary({
                totalExpenses: data.totalExpenses || 0,
                categoryExpenses: data.categoryExpenses || {},
                budgets: data.budgets || [],
                monthlyExpenses: data.monthlyExpenses || [],
                budgetComparison: data.budgetComparison || [],
                recentTransactions: data.recentTransactions || [],
            });
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to fetch summary.");
        } finally {
            setLoading(false);
        }
    };

    // --- Transaction Actions ---

    const addTransaction = async (transaction) => {
        try {
            const ownerId = getOwnerId();
            if (!ownerId) return;

            if (!transaction.amount || !transaction.description || !transaction.date || !transaction.category) {
                setError("All transaction fields are required.");
                return;
            }

            await axios.post("/api/transactions", { ...transaction, ownerId });
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (err) {
            console.error(err);
            setError("Failed to add transaction.");
        }
    };

    const editTransaction = async (id, updatedTransaction) => {
        try {
            await axios.put(`/api/transactions/${id}`, updatedTransaction);
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (err) {
            console.error(err);
            setError("Failed to edit transaction.");
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}`);
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (err) {
            console.error(err);
            setError("Failed to delete transaction.");
        }
    };

    // --- Budget Actions ---

    const createBudget = async ({ category, amount, month }) => {
        try {
            const ownerId = getOwnerId();
            if (!ownerId) return;

            if (!category || !amount || !month) {
                setError("Category, amount, and month are required to create a budget.");
                return;
            }

            await axios.post("/api/budgets", { category, amount, month, ownerId });
            await Promise.all([fetchBudgets(), fetchSummary()]);
        } catch (err) {
            console.error(err);
            setError("Failed to create budget.");
        }
    };

    const editBudget = async (id, updatedBudget) => {
        try {
            await axios.put(`/api/budgets/${id}`, updatedBudget);
            await Promise.all([fetchBudgets(), fetchSummary()]);
        } catch (err) {
            console.error(err);
            setError("Failed to edit budget.");
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axios.delete(`/api/budgets/${id}`);
            await Promise.all([fetchBudgets(), fetchSummary()]);
        } catch (err) {
            console.error(err);
            setError("Failed to delete budget.");
        }
    };

    // --- Initial load ---
    useEffect(() => {
        fetchTransactions();
        fetchBudgets();
        fetchSummary();
    }, []);

    const value = {
        transactions,
        budgets,
        summary,
        categories,
        loading,
        error,
        fetchTransactions,
        fetchBudgets,
        fetchSummary,
        addTransaction,
        editTransaction,
        deleteTransaction,
        createBudget,
        editBudget,
        deleteBudget,
    };

    return (
        <BudgetContext.Provider value={value}>
            {children}
        </BudgetContext.Provider>
    );
}

"use client";

import { useBudget } from "@/context/ContextProvider";
import { Card, CardContent } from "@/components/ui/card";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, ResponsiveContainer, Legend
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#00c49f", "#ffbb28", "#ff8042"];

const NoData = () => (
    <div className="text-txt/60 text-sm text-center">
        No data available
    </div>
);

export default function ChartsSection() {
    const { summary } = useBudget();

    const formattedCategoryExpenses = Object.entries(summary?.categoryExpenses || {}).map(
        ([category, total]) => ({ category, total })
    );

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            {/* Bar Chart Section */}
            <Card className="bg-crd text-txt rounded-2xl shadow-lg flex-1">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-2">Monthly Expenses</h2>
                    <div className="h-[320px] bg-bg/60 rounded-xl overflow-hidden flex items-center justify-center">
                        {(summary?.monthlyExpenses || []).length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={summary.monthlyExpenses}
                                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                                >
                                    <XAxis dataKey="month" stroke="#aaa" tickLine={false} axisLine={false} />
                                    <YAxis stroke="#aaa" tickLine={false} axisLine={false} />
                                    <Tooltip cursor={{ fill: "rgba(136, 132, 216, 0.1)" }} />
                                    <Bar dataKey="total" fill="#8884d8" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <NoData />
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Pie Chart Section */}
            <Card className="bg-crd text-txt rounded-2xl shadow-lg flex-1">
                <CardContent className="p-6 space-y-4">
                    <h2 className="text-2xl font-bold mb-2">Expenses by Category</h2>
                    <div className="h-[320px] bg-bg/60 rounded-xl overflow-hidden flex items-center justify-center">
                        {formattedCategoryExpenses.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={formattedCategoryExpenses}
                                        dataKey="total"
                                        nameKey="category"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={100}
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                    >
                                        {formattedCategoryExpenses.map((_, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <NoData />
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

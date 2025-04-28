"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, CreditCard, PieChart } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        title: "Expense Tracking",
        description: "Easily log your expenses and monitor where your money flows.",
        icon: CreditCard,
    },
    {
        title: "Smart Budgeting",
        description: "Set monthly budgets for different categories and stick to your plan.",
        icon: PieChart,
    },
    {
        title: "Data Visualization",
        description: "Interactive charts to visualize your spending and saving patterns.",
        icon: TrendingUp,
    },
];

export default function FeaturesSection() {
    return (
        <section className="py-16 bg-bg px-6">
            <div className="max-w-6xl mx-auto text-center space-y-12">

                {/* Heading */}
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-bold text-txt">
                        Why Choose Finance Visualizer?
                    </h2>
                    <p className="text-second max-w-2xl mx-auto">
                        Get complete control over your finances with features designed to simplify money management.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card className="bg-bg border border-second rounded-2xl shadow-lg hover:shadow-main/40 transition">
                                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                                    <feature.icon className="h-10 w-10 text-main" />
                                    <h3 className="text-xl font-semibold text-txt">{feature.title}</h3>
                                    <p className="text-second text-sm">{feature.description}</p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

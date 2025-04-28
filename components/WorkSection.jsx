"use client";

import { motion } from "framer-motion";
import { BadgeDollarSign, Settings, BarChart4 } from "lucide-react";

const steps = [
    {
        icon: BadgeDollarSign,
        title: "Add Your Transactions",
        description: "Quickly log your incomes and expenses with simple forms.",
    },
    {
        icon: Settings,
        title: "Set Up Budgets",
        description: "Assign monthly budgets to categories like Food, Travel, and Utilities.",
    },
    {
        icon: BarChart4,
        title: "Visualize Your Finances",
        description: "Use charts to monitor spending, saving, and future trends.",
    },
];

export default function HowItWorksSection() {
    return (
        <section className="py-20 bg-bg px-6">
            <div className="max-w-5xl mx-auto text-center space-y-12">

                {/* Heading */}
                <div className="space-y-3">
                    <h2 className="text-3xl md:text-5xl font-bold text-txt">
                        How It Works
                    </h2>
                    <p className="text-second max-w-2xl mx-auto">
                        Just three easy steps to master your money flow.
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 mt-12">

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col items-center text-center max-w-[250px]"
                        >
                            <div className="bg-main/20 text-main rounded-full p-4 mb-4">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-semibold text-txt">{step.title}</h3>
                            <p className="text-second text-sm mt-2">{step.description}</p>
                        </motion.div>
                    ))}

                </div>

            </div>
        </section>
    );
}

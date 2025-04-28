"use client";

import { Button } from "@/components/ui/button";
import { getOrCreateOwnerId } from "@/lib/getOrCreateOwnerId";
import { motion } from "framer-motion";
import { Wallet, Banknote, PieChart, TrendingUp, DollarSign } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative overflow-hidden min-h-[90vh] flex flex-col items-center justify-center text-center bg-bg px-6">

            {/* Floating Background Icons */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Wallet Icon */}
                <motion.div
                    className="absolute top-10 left-10 text-main/40"
                    animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                >
                    <DollarSign className="h-16 w-16" />
                </motion.div>

                {/* Banknote Icon */}
                <motion.div
                    className="absolute bottom-20 right-20 text-main/40"
                    animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                >
                    <Banknote className="h-20 w-20" />
                </motion.div>

                {/* PieChart Icon */}
                <motion.div
                    className="absolute top-32 right-32 text-main/40"
                    animate={{ y: [0, -10, 0], x: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                >
                    <PieChart className="h-14 w-14" />
                </motion.div>

                {/* TrendingUp Icon */}
                <motion.div
                    className="absolute bottom-32 left-32 text-main/40"
                    animate={{ y: [0, 12, 0], x: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 7.5, ease: "easeInOut" }}
                >
                    <TrendingUp className="h-18 w-18" />
                </motion.div>
            </div>

            {/* Main Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6 max-w-3xl relative z-10"
            >
                {/* App Icon */}
                <div className="flex justify-center">
                    <Wallet className="h-12 w-12 text-main" />
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-txt">
                    Finance Visualizer
                </h1>

                {/* Subheading */}
                <p className="text-second text-lg md:text-xl">
                    Track your expenses, plan your budgets, and visualize your financial journey — all in one place.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button onClick={() => getOrCreateOwnerId()} className="bg-main text-txt rounded text-lg hover:bg-main/90">
                        <Link href="/dashboard" className="flex items-center">
                            Get Started
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        className="rounded text-lg text-second hover:border-main hover:text-main"
                    >
                        Learn More
                    </Button>
                </div>
            </motion.div>
        </section>
    );
}

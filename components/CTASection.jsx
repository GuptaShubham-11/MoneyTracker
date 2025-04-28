"use client";

import { Button } from "@/components/ui/button";
import { getOrCreateOwnerId } from "@/lib/getOrCreateOwnerId";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CTASection() {
    return (
        <section className="py-20 px-6 bg-main/10 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto space-y-8"
            >
                <h2 className="text-4xl font-bold text-txt">
                    Ready to Take Control of Your Money?
                </h2>
                <p className="text-second max-w-xl mx-auto">
                    Start tracking your spending, setting goals, and growing your savings — all in one place.
                </p>
                <Button onClick={() => getOrCreateOwnerId()} size="lg" className="bg-main text-txt text-xl rounded hover:bg-main/90">
                    <Link href="/dashboard" className="flex items-center">
                        Get Started Free
                    </Link>
                </Button>
            </motion.div>
        </section>
    );
}

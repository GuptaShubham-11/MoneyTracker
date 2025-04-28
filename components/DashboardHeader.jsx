'use client'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function DashboardHeader() {
    return (
        <div className="sticky top-0 z-50 bg-bg/80 backdrop-blur-md flex items-center justify-between p-4 rounded-b-lg shadow-md">
            <h1 className="text-2xl font-bold text-main">Money Tracker</h1>
        </div>
    );
}

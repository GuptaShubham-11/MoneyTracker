"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SaveAll } from "lucide-react";

export function TransactionModal({ open, onClose, onSave, initialData }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (initialData) {
            setAmount(initialData.amount || "");
            setDescription(initialData.description || "");
            setDate(initialData.date || "");
            setCategory(initialData.category || "");
        } else {
            setAmount("");
            setDescription("");
            setDate("");
            setCategory("");
        }
        setErrors({}); // Clear errors when modal opens
    }, [initialData, open]);

    const validate = () => {
        const newErrors = {};
        if (!amount) newErrors.amount = "Amount is required.";
        if (!description) newErrors.description = "Description is required.";
        if (!date) newErrors.date = "Date is required.";
        if (!category) newErrors.category = "Category is required.";
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const data = { amount, description, date, category };
        onSave(data);
    };

    // 🛠 When typing, clear individual field errors
    const handleChange = (field, value) => {
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: null }));
        }
        switch (field) {
            case "amount":
                setAmount(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "date":
                setDate(value);
                break;
            case "category":
                setCategory(value);
                break;
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-[#1e1e1e] text-white rounded-lg">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold mb-4">
                        {initialData ? "Edit Transaction" : "Add Transaction"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Amount */}
                    <div>
                        <Label htmlFor="amount" className="text-sm text-second mb-1">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => handleChange("amount", e.target.value)}
                            className={errors.amount ? "border-red-500" : ""}
                        />
                        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description" className="text-sm text-second mb-1">Description</Label>
                        <Input
                            id="description"
                            type="text"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => handleChange("description", e.target.value)}
                            className={errors.description ? "border-red-500" : ""}
                        />
                        {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                    </div>

                    {/* Date */}
                    <div>
                        <Label htmlFor="date" className="text-sm text-second mb-1">Date</Label>
                        <Input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className={errors.date ? "border-red-500" : ""}
                        />
                        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="category" className="text-sm text-second mb-1">Category</Label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            className={`w-full p-2 rounded bg-[#2a2a2a] text-white ${errors.category ? "border-red-500" : ""}`}
                        >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Travel">Travel</option>
                            <option value="Rent">Rent</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Other">Other</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end gap-4 mt-6">
                        <Button onClick={handleSubmit} className="bg-main hover:bg-main/90">
                            <SaveAll className="mr-2 h-4 w-4" /> Save
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

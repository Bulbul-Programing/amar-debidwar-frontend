/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InfoRow from "@/components/Shared/InoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { TExpense } from "@/types/dashboard/MP/expense/expense";
import {
    Receipt,
    Wallet,
    FolderKanban,
    FileImage,
    Calendar,
} from "lucide-react";

interface IExpenseViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    expense: TExpense | null;
}

const ExpenseViewDetailDialog = ({
    open,
    onClose,
    expense,
}: IExpenseViewDetailDialogProps) => {
    if (!expense) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Expense Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Expense Header */}
                    <div className="flex flex-col gap-4 p-6 bg-linear-to-br from-rose-200/40 to-orange-200/30 rounded-lg mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-1">
                                    Expense Record
                                </h2>
                                <p className="text-muted-foreground">
                                    {expense.description}
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="text-lg px-4 py-2 w-fit"
                            >
                                ৳ {expense.amount.toLocaleString()}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDateTime(expense.expenseDate)}
                            </Badge>

                            <Badge variant="outline">
                                Category: {expense.expenseCategory?.name}
                            </Badge>
                        </div>
                    </div>

                    {/* Expense Information */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Receipt className="h-5 w-5 text-rose-600" />
                                Expense Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Description"
                                    value={expense.description}
                                />
                                <InfoRow
                                    label="Amount"
                                    value={`৳ ${expense.amount.toLocaleString()}`}
                                />
                                <InfoRow
                                    label="Expense Date"
                                    value={formatDateTime(expense.expenseDate)}
                                />
                                <InfoRow
                                    label="Category"
                                    value={expense.expenseCategory?.name}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Project Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FolderKanban className="h-5 w-5 text-blue-600" />
                                Related Project
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Project Title"
                                    value={expense.project?.title}
                                />
                                <InfoRow
                                    label="Location"
                                    value={expense.project?.location}
                                />
                                <InfoRow
                                    label="Estimated Cost"
                                    value={`৳ ${expense.project?.estimatedCost.toLocaleString()}`}
                                />
                                <InfoRow
                                    label="Actual Cost"
                                    value={
                                        expense.project?.actualCost
                                            ? `৳ ${expense.project.actualCost.toLocaleString()}`
                                            : "—"
                                    }
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Chalan Image */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FileImage className="h-5 w-5 text-emerald-600" />
                                Chalan / Receipt
                            </h3>

                            <div className="bg-muted/50 p-4 rounded-lg">
                                {expense.chalanImage ? (
                                    <a
                                        href={expense.chalanImage}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        View Chalan Image
                                    </a>
                                ) : (
                                    <span className="text-muted-foreground">
                                        No chalan image uploaded
                                    </span>
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Meta Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-purple-600" />
                                Record Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Created At"
                                    value={formatDateTime(expense.createdAt)}
                                />
                                <InfoRow
                                    label="Updated At"
                                    value={formatDateTime(expense.updatedAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ExpenseViewDetailDialog;

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
import { TBudgetResponse } from "@/types/dashboard/MP/budget/budgetTypes";
import {
    Wallet,
    Calendar,
    Landmark,
    FileText,
} from "lucide-react";

interface IBudgetViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    budget: TBudgetResponse | null;
}

const BudgetViewDetailDialog = ({
    open,
    onClose,
    budget,
}: IBudgetViewDetailDialogProps) => {
    if (!budget) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Budget Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Budget Header */}
                    <div className="flex flex-col gap-4 p-6 bg-linear-to-br from-primary/30 to-emerald-200/30 rounded-lg mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-1">
                                    {budget.title}
                                </h2>
                                <p className="text-muted-foreground">
                                    {budget.description}
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="text-lg px-4 py-2 w-fit"
                            >
                                ৳ {budget.budgetAmount.toLocaleString()}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">
                                Fiscal Year: {budget.fiscalYear}
                            </Badge>
                            <Badge variant="outline">
                                Receive Date:{" "}
                                {formatDateTime(budget.receiveDate)}
                            </Badge>
                        </div>
                    </div>

                    {/* Budget Information */}
                    <div className="space-y-6">
                        {/* Budget Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-blue-600" />
                                Budget Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Budget Title"
                                    value={budget.title}
                                />
                                <InfoRow
                                    label="Fiscal Year"
                                    value={budget.fiscalYear}
                                />
                                <InfoRow
                                    label="Budget Amount"
                                    value={`৳ ${budget.budgetAmount.toLocaleString()}`}
                                />
                                <InfoRow
                                    label="Receive Date"
                                    value={formatDateTime(budget.receiveDate)}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Fund Source */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Landmark className="h-5 w-5 text-green-600" />
                                Fund Source
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Fund Source Name"
                                    value={budget.fundSource.name}
                                />
                                <InfoRow
                                    label="Ministry"
                                    value={budget.fundSource.ministry}
                                />
                                <InfoRow
                                    label="Fund Source ID"
                                    value={budget.fundSourceId}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Meta Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                                Record Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Created At"
                                    value={formatDateTime(budget.createdAt)}
                                />
                                <InfoRow
                                    label="Updated At"
                                    value={formatDateTime(budget.updateAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default BudgetViewDetailDialog;

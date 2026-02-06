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
import { FileText, Wallet, Calendar, Landmark } from "lucide-react";

interface IBudgetViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    budget: TBudgetResponse;
}

const BudgetViewDetailDialog = ({
    open,
    onClose,
    budget,
}: IBudgetViewDetailDialogProps) => {
    return (
        <div>
            {
                budget && <Dialog open={open} onOpenChange={onClose}>
                    <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                        <DialogHeader className="px-6 pt-6 pb-4">
                            <DialogTitle>Budget Details</DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto px-6 pb-6">
                            {/* No Data Found */}
                            {!budget && (
                                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                    <FileText className="h-10 w-10 mb-3" />
                                    <p className="text-lg font-medium">No budget data found</p>
                                    <p className="text-sm">Please select a valid budget record</p>
                                </div>
                            )}

                            {budget && (
                                <>
                                    {/* Header */}
                                    <div className="flex justify-between items-center gap-4 p-6 bg-linear-to-br from-primary/30 to-emerald-200/30 rounded-lg mb-6">
                                        <div>
                                            <h2 className="text-3xl font-bold mb-1">
                                                {budget.title}
                                            </h2>

                                            {budget.fundSource && (
                                                <Badge variant="outline">
                                                    {budget.fundSource.name}
                                                </Badge>
                                            )}
                                        </div>

                                        <Badge
                                            variant="secondary"
                                            className="text-lg px-4 py-2"
                                        >
                                            ৳ {budget.budgetAmount}
                                        </Badge>
                                    </div>

                                    {/* Budget Information */}
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Wallet className="h-5 w-5 text-blue-600" />
                                                Budget Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                <InfoRow label="Title" value={budget.title} />
                                                <InfoRow label="Description" value={budget.description} />
                                                <InfoRow
                                                    label="Budget Amount"
                                                    value={`৳ ${budget.budgetAmount}`}
                                                />
                                                <InfoRow
                                                    label="Fiscal Year"
                                                    value={budget.fiscalYear}
                                                />
                                            </div>
                                        </div>

                                        <Separator />

                                        {/* Fund Source */}
                                        {budget.fundSource && (
                                            <div>
                                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                    <Landmark className="h-5 w-5 text-green-600" />
                                                    Fund Source
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                    <InfoRow
                                                        label="Source Name"
                                                        value={budget.fundSource.name}
                                                    />
                                                    <InfoRow
                                                        label="Ministry"
                                                        value={budget.fundSource.ministry}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <Separator />

                                        {/* Record Info */}
                                        <div>
                                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                                <Calendar className="h-5 w-5 text-purple-600" />
                                                Record Information
                                            </h3>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                                <InfoRow
                                                    label="Receive Date"
                                                    value={formatDateTime(budget.receiveDate)}
                                                />
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
                                </>
                            )}
                        </div>
                    </DialogContent>
                </Dialog>
            }

        </div>

    );
};

export default BudgetViewDetailDialog;
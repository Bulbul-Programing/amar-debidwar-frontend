"use client"
import ManagementTable from '@/components/Shared/ManagementTable';
import { TBudgetResponse } from '@/types/dashboard/MP/budget/budgetTypes';
import React, { useState, useTransition } from 'react';
import { BudgetColumns } from './BudgetColumns';
import DeleteConfirmationDialog from '@/components/Shared/DeleteConfirmationDialog';
import { useRouter } from 'next/navigation';
import { deleteBudget } from '@/service/Dashboard/MP/budget/budgetManagement';
import { toast } from 'sonner';
import BudgetViewDetailDialog from './BudgetViewDetailDialog';
import BudgetFormDialog from './CreateBudgetFormDialog';
import { TFundSource } from '@/types/dashboard/MP/Fund/FundTypes';

interface budgetProps {
    fundSources: TFundSource[]
    budgets: TBudgetResponse[];
}

const AllBudget = ({ budgets, fundSources }: budgetProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingBudget, setDeletingBudget] = useState<TBudgetResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingBudget, setViewingBudget] = useState<TBudgetResponse | null>(null);
    const [editBudget, setEditBudget] = useState<TBudgetResponse | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (budget: TBudgetResponse) => {
        setViewingBudget(budget);
    };

    const handleEdit = (budget: TBudgetResponse) => {
        setEditBudget(budget)
    }

    const handleDelete = (fundSource: TBudgetResponse) => {
        setDeletingBudget(fundSource);
    };

    const confirmDelete = async () => {
        if (!deletingBudget) return;

        setIsDeleting(true);
        const result = await deleteBudget(deletingBudget.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Fund source deleted successfully");
            setDeletingBudget(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete fund source");
        }
    };

    return (
        <div>
            <ManagementTable
                data={budgets}
                columns={BudgetColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No Budget found"
            />

            <BudgetFormDialog
                open={!!editBudget}
                onClose={() => setEditBudget(null)}
                fundSources={fundSources}
                budget={editBudget!}
                onSuccess={() => {
                    setEditBudget(null);
                    handleRefresh();
                }}
            />

            <BudgetViewDetailDialog
                open={!!viewingBudget}
                onClose={() => setViewingBudget(null)}
                budget={viewingBudget}
            />

            <DeleteConfirmationDialog
                open={!!deletingBudget}
                onOpenChange={(open) =>
                    !open && setDeletingBudget(null)
                }
                onConfirm={confirmDelete}
                title="Delete Budget"
                description={`Are you sure you want to delete ${deletingBudget?.description}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default AllBudget;
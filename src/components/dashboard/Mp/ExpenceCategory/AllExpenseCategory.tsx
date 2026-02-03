"use client"
import ManagementTable from '@/components/Shared/ManagementTable';
import React, { useState, useTransition } from 'react';
import { ExpenseCategoryColumns } from './expenseCategoryClumns';
import { TExpenseCategory } from '@/types/dashboard/MP/expenseCategory/expenseCategory';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import ExpenseCategoryFormDialog from './ExpenseCategoryFormDialog';
import DeleteConfirmationDialog from '@/components/Shared/DeleteConfirmationDialog';
import { deleteExpenseCategory } from '@/service/Dashboard/MP/ExpenseCategory/expenseCategory';
interface AllExpenseCategoryProps {
    expenseCategory: TExpenseCategory[],
}

const AllExpenseCategory = ({ expenseCategory }: AllExpenseCategoryProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingExpenseCategory, setDeletingExpenseCategory] = useState<TExpenseCategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editExpenseCategory, setExpenseCategory] = useState<TExpenseCategory | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleEdit = (project: TExpenseCategory) => {
        setExpenseCategory(project)
    }

    const handleDelete = (project: TExpenseCategory) => {
        setDeletingExpenseCategory(project);
    };

    const confirmDelete = async () => {
        if (!deletingExpenseCategory) return;

        setIsDeleting(true);
        const result = await deleteExpenseCategory(deletingExpenseCategory.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Expense category deleted successfully");
            setDeletingExpenseCategory(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete Expense category");
        }
    };

    return (
        <div>
            <ManagementTable
                data={expenseCategory}
                columns={ExpenseCategoryColumns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No Budget found"
            />

            <ExpenseCategoryFormDialog
                open={!!editExpenseCategory}
                onClose={() => setExpenseCategory(null)}
                category={editExpenseCategory!}
                onSuccess={() => {
                    setExpenseCategory(null);
                    handleRefresh();
                }}
            />

            <DeleteConfirmationDialog
                open={!!deletingExpenseCategory}
                onOpenChange={(open) =>
                    !open && setDeletingExpenseCategory(null)
                }
                onConfirm={confirmDelete}
                title="Delete Expense Category"
                description={`Are you sure you want to delete ${deletingExpenseCategory?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />

        </div>
    );
};

export default AllExpenseCategory;
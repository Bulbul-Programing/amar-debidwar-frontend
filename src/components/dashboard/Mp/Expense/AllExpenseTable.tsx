'use client'

import ManagementTable from "@/components/Shared/ManagementTable";
import { TExpense } from "@/types/dashboard/MP/expense/expense";
import { TExpenseCategory } from "@/types/dashboard/MP/expenseCategory/expenseCategory";
import { TProjectResponse } from "@/types/dashboard/MP/Projects/ProjectTypes";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ExpenseColumns } from "./ExpenseColumns";
import ExpenseFormDialog from "./ExpenseFormDialog";
import ExpenseViewDetailDialog from "./ExpenseViewDetailDialog";

interface AllProjectProps {
    expense: TExpense[],
    expenseCategories: TExpenseCategory[],
    projects: TProjectResponse[]
}

const AllExpenseTable = ({ expense, expenseCategories, projects }: AllProjectProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [viewingExpense, setViewingExpense] = useState<TExpense | null>(null);
    const [editExpense, setEditExpense] = useState<TExpense | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (project: TExpense) => {
        setViewingExpense(project);
    };

    const handleEdit = (project: TExpense) => {
        setEditExpense(project)
    }

    return (
        <div>
            <ManagementTable
                data={expense}
                columns={ExpenseColumns}
                onView={handleView}
                onEdit={handleEdit}
                getRowKey={(budget) => budget.id}
                emptyMessage="No Budget found"
            />

            <ExpenseViewDetailDialog
                open={!!viewingExpense}
                onClose={() => setViewingExpense(null)}
                expense={viewingExpense}
            />

            <ExpenseFormDialog
                open={!!editExpense}
                onClose={() => setEditExpense(null)}
                expense={editExpense!}
                categories={expenseCategories}
                projects={projects}
                onSuccess={() => {
                    setEditExpense(null);
                    handleRefresh();
                }}
            />
        </div>
    );
};

export default AllExpenseTable;
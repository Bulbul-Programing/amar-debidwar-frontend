"use client"
import ManagementPageHeader from "@/components/Shared/ManagementPageHeader";
import ExpenseFormDialog from "./ExpenseFormDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TExpenseCategory } from "@/types/dashboard/MP/expenseCategory/expenseCategory";
import { TProjectResponse } from "@/types/dashboard/MP/Projects/ProjectTypes";
import { Plus } from "lucide-react";

interface expenseHeaderProps {
    categories: TExpenseCategory[],
    projects: TProjectResponse[]
}

const ExpenseManagementHeader = ({ categories, projects }: expenseHeaderProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        setIsDialogOpen(false)
        startTransition(() => {
            router.refresh();
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div>
            <ExpenseFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                categories={categories}
                projects={projects}
            />
            <ManagementPageHeader
                title="Expense Management"
                description="Manage all Expense."
                action={{
                    label: "Add Expense",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default ExpenseManagementHeader;
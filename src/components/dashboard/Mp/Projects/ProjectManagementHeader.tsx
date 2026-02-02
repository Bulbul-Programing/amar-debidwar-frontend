"use client"

import ManagementPageHeader from "@/components/Shared/ManagementPageHeader";
import ProjectFormDialog from "./ProjectFormDialog";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { TBudgetResponse } from "@/types/dashboard/MP/budget/budgetTypes";
import { Plus } from "lucide-react";

const ProjectManagementHeader = ({ budget }: { budget: TBudgetResponse[] }) => {
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

            <ProjectFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                budgets={budget}
            />

            <ManagementPageHeader
                title="Project Management"
                description="Manage all Project."
                action={{
                    label: "Add Project",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default ProjectManagementHeader;
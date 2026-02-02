"use client"
import ManagementPageHeader from '@/components/Shared/ManagementPageHeader';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { TFundSource } from '@/types/dashboard/MP/Fund/FundTypes';
import { Plus } from 'lucide-react';
import BudgetFormDialog from './CreateBudgetFormDialog';

const BudgetsManagementHeader = ({ fundSources }: { fundSources: TFundSource[] }) => {
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
            <BudgetFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                fundSources={fundSources}
            />

            <ManagementPageHeader
                title="Budget Management"
                description="Manage all budgets."
                action={{
                    label: "Add Budget",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default BudgetsManagementHeader;
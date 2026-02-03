"use client"

import ManagementPageHeader from '@/components/Shared/ManagementPageHeader';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import ComplainFormDialog from './ComplainFormDialog';
import { TComplaintCategory } from '@/types/dashboard/MP/ComplainCategory/complainCategory';

interface complainCategoriesHerderProps {
    complainCategory: TComplaintCategory[]
}

const ComplainManagementHeader = ({ complainCategory }: complainCategoriesHerderProps) => {
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
            <ComplainFormDialog
                complainCategory={complainCategory}
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="Complain Management"
                description="Manage all Complains."
                action={{
                    label: "Add Complain",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default ComplainManagementHeader;
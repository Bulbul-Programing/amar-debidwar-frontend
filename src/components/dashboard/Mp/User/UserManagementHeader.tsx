"use client"
import ManagementPageHeader from '@/components/Shared/ManagementPageHeader';
import CreateUserFormDialog from './CreateAdminFormDialog';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const UserManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
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
            <CreateUserFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
            />

            <ManagementPageHeader
                title="User Management"
                description="Manage all users within the application."
                action={{
                    label: "Add Admin",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default UserManagementHeader;
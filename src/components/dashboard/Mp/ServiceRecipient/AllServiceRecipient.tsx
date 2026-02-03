"use client"
import ManagementTable from '@/components/Shared/ManagementTable';
import { TDonationSection } from '@/types/dashboard/MP/DonationSection/donationSection';
import { TServiceRecipient, TUnion, TVillage } from '@/types/dashboard/MP/serviceRecipient/serviceRecipient';
import React, { useState, useTransition } from 'react';
import { serviceRecipientColumns } from './serviceRecipientColumns';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { deleteServiceRecipient } from '@/service/Dashboard/MP/ServiceRecipient/ServiceRecipientManagement';
import ServiceRecipientFormDialog from './ServiceRecipientFormDialog';
import ServiceRecipientViewDetailDialog from './ServiceRecipientViewDetailDialog';
import DeleteConfirmationDialog from '@/components/Shared/DeleteConfirmationDialog';

interface AllServiceRecipientProps {
    unions: TUnion[];
    villages: TVillage[];
    donations: TDonationSection[]
    serviceRecipient: TServiceRecipient[]
}

const AllServiceRecipient = ({ donations, serviceRecipient, unions, villages }: AllServiceRecipientProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingServiceRecipient, setDeletingServiceRecipient] = useState<TServiceRecipient | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingServiceRecipient, setViewingServiceRecipient] = useState<TServiceRecipient | null>(null);
    const [editServiceRecipient, setEditServiceRecipient] = useState<TServiceRecipient | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (serviceRecipient: TServiceRecipient) => {
        setViewingServiceRecipient(serviceRecipient);
    };

    const handleEdit = (serviceRecipient: TServiceRecipient) => {
        setEditServiceRecipient(serviceRecipient)
    }

    const handleDelete = (serviceRecipient: TServiceRecipient) => {
        setDeletingServiceRecipient(serviceRecipient);
    };

    const confirmDelete = async () => {
        if (!deletingServiceRecipient) return;

        setIsDeleting(true);
        const result = await deleteServiceRecipient(deletingServiceRecipient.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Project deleted successfully");
            setDeletingServiceRecipient(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete project");
        }
    };

    return (
        <div>
            <ManagementTable
                data={serviceRecipient}
                columns={serviceRecipientColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No Budget found"
            />

            <ServiceRecipientFormDialog
                open={!!editServiceRecipient}
                onClose={() => setEditServiceRecipient(null)}
                donations={donations}
                unions={unions}
                villages={villages}
                recipient={editServiceRecipient!}
                onSuccess={() => {
                    setEditServiceRecipient(null);
                    handleRefresh();
                }}
            />

            <ServiceRecipientViewDetailDialog
                open={!!viewingServiceRecipient}
                onClose={() => setViewingServiceRecipient(null)}
                recipient={viewingServiceRecipient}
            />

            <DeleteConfirmationDialog
                open={!!deletingServiceRecipient}
                onOpenChange={(open) =>
                    !open && setDeletingServiceRecipient(null)
                }
                onConfirm={confirmDelete}
                title="Delete Service Recipient"
                description={`Are you sure you want to delete ${deleteServiceRecipient?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />

        </div>
    );
};

export default AllServiceRecipient;
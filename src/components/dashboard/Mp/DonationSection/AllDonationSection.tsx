"use client"

import ManagementTable from '@/components/Shared/ManagementTable';
import { deleteDonationSection } from '@/service/Dashboard/MP/DonationSection/donationSection';
import { TDonationSection } from '@/types/dashboard/MP/DonationSection/donationSection';
import { useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { DonationSectionColumns } from './DonationSectionColumns';
import DonationSectionFormDialog from './DonationFormDialog';
import DeleteConfirmationDialog from '@/components/Shared/DeleteConfirmationDialog';

interface donationSectionProps {
    donationSection: TDonationSection[]
}

const AllDonationSection = ({ donationSection }: donationSectionProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingDonationSection, setDeletingDonationSection] = useState<TDonationSection | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editDonationSection, setEditDonationSection] = useState<TDonationSection | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleEdit = (budget: TDonationSection) => {
        setEditDonationSection(budget)
    }

    const handleDelete = (fundSource: TDonationSection) => {
        setDeletingDonationSection(fundSource);
    };

    const confirmDelete = async () => {
        if (!deletingDonationSection) return;

        setIsDeleting(true);
        const result = await deleteDonationSection(deletingDonationSection.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Donation section deleted successfully");
            setDeletingDonationSection(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete Donation section");
        }
    };
    return (
        <div>
            <ManagementTable
                data={donationSection}
                columns={DonationSectionColumns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No Budget found"
            />

            <DonationSectionFormDialog
                open={!!editDonationSection}
                onClose={() => setEditDonationSection(null)}
                donationSection={editDonationSection!}
                onSuccess={() => {
                    setEditDonationSection(null);
                    handleRefresh();
                }}
            />
            <DeleteConfirmationDialog
                open={!!deletingDonationSection}
                onOpenChange={(open) =>
                    !open && setDeletingDonationSection(null)
                }
                onConfirm={confirmDelete}
                title="Delete Budget"
                description={`Are you sure you want to delete ${deletingDonationSection?.title}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default AllDonationSection;
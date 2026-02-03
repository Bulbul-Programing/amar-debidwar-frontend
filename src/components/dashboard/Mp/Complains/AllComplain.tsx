"use client"
import ManagementTable from '@/components/Shared/ManagementTable';
import { deleteComplain } from '@/service/Dashboard/MP/Complain/complainManagement';
import { TComplain } from '@/types/dashboard/MP/complain/complain';
import { TComplaintCategory } from '@/types/dashboard/MP/ComplainCategory/complainCategory';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { ComplainColumns } from './ComplainColumns';
import ComplainFormDialog from './ComplainFormDialog';
import DeleteConfirmationDialog from '@/components/Shared/DeleteConfirmationDialog';
import ComplainViewDetailDialog from './ComplainViewDetailsDialog';

interface complainProps {
    complainCategory: TComplaintCategory[]
    complains: TComplain[]
}
const AllComplain = ({ complains, complainCategory }: complainProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingComplain, setDeletingComplain] = useState<TComplain | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingComplain, setViewingComplain] = useState<TComplain | null>(null);
    const [editComplain, setEditComplain] = useState<TComplain | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (budget: TComplain) => {
        setViewingComplain(budget);
    };

    const handleEdit = (budget: TComplain) => {
        setEditComplain(budget)
    }

    const handleDelete = (fundSource: TComplain) => {
        setDeletingComplain(fundSource);
    };

    const confirmDelete = async () => {
        if (!deletingComplain) return;

        setIsDeleting(true);
        const result = await deleteComplain(deletingComplain.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Fund source deleted successfully");
            setDeletingComplain(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete fund source");
        }
    };
    return (
        <div>
            <ManagementTable
                data={complains}
                columns={ComplainColumns}
                onEdit={handleEdit}
                onView={handleView}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No complain found"
            />

            <ComplainViewDetailDialog
                open={!!viewingComplain}
                onClose={() => setViewingComplain(null)}
                complain={viewingComplain!}
            />

            <ComplainFormDialog
                open={!!editComplain}
                onClose={() => setEditComplain(null)}
                complainCategory={complainCategory}
                complain={editComplain!}
                onSuccess={() => {
                    setEditComplain(null);
                    handleRefresh();
                }}
            />

            <DeleteConfirmationDialog
                open={!!deletingComplain}
                onOpenChange={(open) =>
                    !open && setDeletingComplain(null)
                }
                onConfirm={confirmDelete}
                title="Delete Complain "
                description={`Are you sure you want to delete ${deletingComplain?.title}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />

        </div>
    );
};

export default AllComplain;
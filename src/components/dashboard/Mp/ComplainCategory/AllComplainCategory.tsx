"use client"
import ManagementTable from "@/components/Shared/ManagementTable";
import { TComplaintCategory } from "@/types/dashboard/MP/ComplainCategory/complainCategory";
import { ComplaintCategoryColumns } from "./ComplaintCategoryColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteComplaintCategory } from "@/service/Dashboard/MP/ComplainCategory/complainCategory";
import { toast } from "sonner";
import ComplainCategoryFormDialog from "./ComplainCategoryFormDialog";
import DeleteConfirmationDialog from "@/components/Shared/DeleteConfirmationDialog";

interface complainCategoryProps {
    complainCategory: TComplaintCategory[]
}

const AllComplainCategory = ({ complainCategory }: complainCategoryProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingComplainCategory, setDeletingComplainCategory] = useState<TComplaintCategory | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingComplainCategory, setViewingComplainCategory] = useState<TComplaintCategory | null>(null);
    const [editComplainCategory, setEditComplainCategory] = useState<TComplaintCategory | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (budget: TComplaintCategory) => {
        setViewingComplainCategory(budget);
    };

    const handleEdit = (budget: TComplaintCategory) => {
        setEditComplainCategory(budget)
    }

    const handleDelete = (fundSource: TComplaintCategory) => {
        setDeletingComplainCategory(fundSource);
    };

    const confirmDelete = async () => {
        if (!deletingComplainCategory) return;

        setIsDeleting(true);
        const result = await deleteComplaintCategory(deletingComplainCategory.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Fund source deleted successfully");
            setDeletingComplainCategory(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete fund source");
        }
    };
    return (
        <div>
            <ManagementTable
                data={complainCategory}
                columns={ComplaintCategoryColumns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No complain category found"
            />

            <ComplainCategoryFormDialog
                open={!!editComplainCategory}
                onClose={() => setEditComplainCategory(null)}
                category={editComplainCategory!}
                onSuccess={() => {
                    setEditComplainCategory(null);
                    handleRefresh();
                }}
            />

            <DeleteConfirmationDialog
                open={!!deletingComplainCategory}
                onOpenChange={(open) =>
                    !open && setDeletingComplainCategory(null)
                }
                onConfirm={confirmDelete}
                title="Delete Complain Category"
                description={`Are you sure you want to delete ${deletingComplainCategory?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />

        </div>
    );
};

export default AllComplainCategory;
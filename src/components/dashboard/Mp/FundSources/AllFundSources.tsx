"use client";

import ManagementTable from "@/components/Shared/ManagementTable";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import DeleteConfirmationDialog from "@/components/Shared/DeleteConfirmationDialog";
import { TFundSource } from "@/types/dashboard/MP/Fund/FundTypes";
import { deleteFundSource } from "@/service/Dashboard/MP/FundSource/fundManagement";
import { FundSourceColumns } from "./FundSourceColumns";

interface FundSourceProps {
    fundSources: TFundSource[];
}

const AllFundSources = ({ fundSources }: FundSourceProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingFundSource, setDeletingFundSource] = useState<TFundSource | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (fundSource: TFundSource) => {
        setDeletingFundSource(fundSource);
    };

    const confirmDelete = async () => {
        if (!deletingFundSource) return;

        setIsDeleting(true);
        const result = await deleteFundSource(deletingFundSource.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Fund source deleted successfully");
            setDeletingFundSource(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete fund source");
        }
    };

    return (
        <div>
            <ManagementTable
                data={fundSources}
                columns={FundSourceColumns}
                onDelete={handleDelete}
                getRowKey={(fundSource) => fundSource.id}
                emptyMessage="No fund source found"
            />

            <DeleteConfirmationDialog
                open={!!deletingFundSource}
                onOpenChange={(open) =>
                    !open && setDeletingFundSource(null)
                }
                onConfirm={confirmDelete}
                title="Delete Fund Source"
                description={`Are you sure you want to delete ${deletingFundSource?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default AllFundSources;

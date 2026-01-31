"use client"

import ManagementTable from "@/components/Shared/ManagementTable";
import { TUser } from "@/types/User/TUserInfo";
import { userColumns } from "./userColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface userProps {
    users: TUser[]
}

const AllUsers = ({ users }: userProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingUser, setDeletingUser] = useState<TUser | null>(null);
    const [viewingUser, setViewingUser] = useState<TUser | null>(null);
    const [editingUser, setEditingUser] = useState<TUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (spot: TUser) => {
        setViewingUser(spot);
    };

    const handleEdit = (spot: TUser) => {
        setEditingUser(spot);
    };

    const handleDelete = (spot: TUser) => {
        setDeletingUser(spot);
    };

    const confirmDelete = async () => {
        // if (!deletingUser) return;

        // setIsDeleting(true);
        // const result = await deleteSpot(deletingUser.id);
        // setIsDeleting(false);

        // if (result.success) {
        //     toast.success(result.message || "Spot deleted successfully");
        //     setDeletingUser(null);
        //     handleRefresh();
        // } else {
        //     toast.error(result.message || "Failed to delete spot");
        // }
    };

    return (
        <div>
            <ManagementTable
                data={users}
                columns={userColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(spot) => spot.id}
                emptyMessage="No spots found"
            />
        </div>
    );
};

export default AllUsers;
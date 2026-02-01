"use client"

import ManagementTable from "@/components/Shared/ManagementTable";
import { TUser } from "@/types/User/TUserInfo";
import { userColumns } from "./userColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import UserViewDetailDialog from "./UserViewDetailDialog";
import DeleteConfirmationDialog from "@/components/Shared/DeleteConfirmationDialog";
import { deleteUser } from "@/service/Dashboard/MP/userManagement";

interface userProps {
    users: TUser[]
}

const AllUsers = ({ users }: userProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingUser, setDeletingUser] = useState<TUser | null>(null);
    const [viewingUser, setViewingUser] = useState<TUser | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (spot: TUser) => {
        setViewingUser(spot);
    };

    const handleDelete = (spot: TUser) => {
        setDeletingUser(spot);
    };

    const confirmDelete = async () => {
        if (!deletingUser) return;

        setIsDeleting(true);
        const result = await deleteUser(deletingUser.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "User deleted successfully");
            setDeletingUser(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete User");
        }
    };

    return (
        <div>
            <ManagementTable
                data={users}
                columns={userColumns}
                onView={handleView}
                onDelete={handleDelete}
                getRowKey={(user) => user.id}
                emptyMessage="No User found"
            />

            <UserViewDetailDialog
                open={!!viewingUser}
                onClose={() => setViewingUser(null)}
                user={viewingUser}
            />

            <DeleteConfirmationDialog
                open={!!deletingUser}
                onOpenChange={(open) => !open && setDeletingUser(null)}
                onConfirm={confirmDelete}
                title="Delete User"
                description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}

            />

        </div>
    );
};

export default AllUsers;
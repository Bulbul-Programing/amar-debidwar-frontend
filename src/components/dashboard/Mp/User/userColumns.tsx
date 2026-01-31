/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/Shared/cell/DateCell";
import { RoleBadgeCell } from "@/components/Shared/cell/RoleBadgeCell";
import { StatusBadgeCell } from "@/components/Shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/Shared/cell/UserInfoCell";
import { Column } from "@/components/Shared/ManagementTable";
import { Button } from "@/components/ui/button";
import { blockedUser } from "@/service/Dashboard/MP/userManagement";
import { TUser } from "@/types/User/TUserInfo";
import { toast } from "sonner";

export const userColumns: Column<TUser>[] = [
    {
        header: "User",
        accessor: (user) => (
            <UserInfoCell
                name={user.name}
                email={user.email}
                photo={user.profilePhoto || ""}
            />
        ),
        sortKey: "name",
    },
    {
        header: "Phone",
        accessor: (user) => (
            <span className="text-sm font-medium">{user.phone}</span>
        ),
        sortKey: "phone",
    },
    {
        header: "Role",
        accessor: (user) => (
            <RoleBadgeCell
                role={user.role}
            />
        ),
        sortKey: "role",
    },
    {
        header: "Active",
        accessor: (user) => (
            <StatusBadgeCell
                activeText="Active"
                deletedText="Block"
                isDeleted={!user.isActive}
            />
        ),
        sortKey: "isActive",
    },
    {
        header: "Created At",
        accessor: (user) => <DateCell date={user.createdAt} />,
        sortKey: "createdAt",
    },
    {
        header: "Updated At",
        accessor: (user) => <DateCell date={user.updateAt} />,
        sortKey: "updateAt",
    },
    {
        header: "Updated At",
        accessor: (user) => <DateCell date={user.updateAt} />,
        sortKey: "updateAt",
    },
    {
        header: "Action",
        accessor: (user) => {
            let loading = false

            const updateUser = async () => {
                loading = true
                const result = await blockedUser(user)
                if (result.success) {
                    loading = false
                    toast.success(result.message || "User status update successfully")
                }
                else {
                    toast.error('User status update Fail !')
                }
            }

            return (
                <div>
                    {
                        loading ? <Button size="xs" disabled>Updating...</Button> :
                            <Button size="xs" className="cursor-pointer" disabled={loading} onClick={() => updateUser()}>{user.isActive ? 'Block' : 'Unblock'}</Button>
                    }
                </div>
            )
        }
    }
];

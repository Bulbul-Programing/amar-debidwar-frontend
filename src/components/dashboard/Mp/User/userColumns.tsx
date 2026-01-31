/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DateCell } from "@/components/Shared/cell/DateCell";
import { RoleBadgeCell } from "@/components/Shared/cell/RoleBadgeCell";
import { StatusBadgeCell } from "@/components/Shared/cell/StatusBadgeCell";
import { UserInfoCell } from "@/components/Shared/cell/UserInfoCell";
import { Column } from "@/components/Shared/ManagementTable";
import { TUser } from "@/types/User/TUserInfo";

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
                isDeleted={user.isActive}
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
];

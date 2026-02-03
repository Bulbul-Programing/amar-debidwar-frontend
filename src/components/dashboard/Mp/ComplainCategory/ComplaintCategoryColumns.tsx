/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TComplaintCategory } from "@/types/dashboard/MP/ComplainCategory/complainCategory";

export const ComplaintCategoryColumns: Column<TComplaintCategory>[] = [
    {
        header: "Name",
        accessor: (category) => (
            <span className="text-sm font-medium">{category.name}</span>
        ),
        sortKey: "name",
    },
    {
        header: "Name (Bangla)",
        accessor: (category) => (
            <span className="text-sm">{category.nameBn ?? "—"}</span>
        ),
        sortKey: "nameBn",
    },
    {
        header: "Status",
        accessor: (category) => (
            <span className={`text-sm font-medium ${category.isActive ? "text-green-600" : "text-red-600"}`}>
                {category.isActive ? "Active" : "Inactive"}
            </span>
        ),
        sortKey: "isActive",
    },
    {
        header: "Created At",
        accessor: (category) => (
            <span className="text-sm">
                {new Date(category.createdAt).toLocaleDateString()}
            </span>
        ),
        sortKey: "createdAt",
    },
    {
        header: "Updated At",
        accessor: (category) => (
            <span className="text-sm">
                {new Date(category.updatedAt).toLocaleDateString()}
            </span>
        ),
        sortKey: "updatedAt",
    },
];

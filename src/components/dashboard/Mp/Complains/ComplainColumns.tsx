/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TComplain } from "@/types/dashboard/MP/complain/complain";

export const ComplainColumns: Column<TComplain>[] = [
    {
        header: "Title",
        accessor: (complain) => (
            <div className="max-w-48">
                <span className="text-sm line-clamp-2 truncate">{complain.title}</span>
            </div>
        ),
        sortKey: "title",
    },
    {
        header: "Description",
        accessor: (complain) => (
            <div className="max-w-56">
                <span className="text-sm line-clamp-2 truncate">{complain.description}</span>
            </div>
        ),
        sortKey: "description",
    },
    {
        header: "Location",
        accessor: (complain) => (
            <span className="text-sm">{complain.location}</span>
        ),
        sortKey: "location",
    },
    {
        header: "Category",
        accessor: (complain) => (
            <span className="text-sm font-medium">{complain.category?.name}</span>
        ),
        sortKey: "category",
    },

    {
        header: "Created At",
        accessor: (complain) => (
            <span className="text-sm">
                {new Date(complain.createdAt).toLocaleDateString()}
            </span>
        ),
        sortKey: "createdAt",
    },
    {
        header: "Updated At",
        accessor: (complain) => (
            <span className="text-sm">
                {new Date(complain.updateAt).toLocaleDateString()}
            </span>
        ),
        sortKey: "updateAt",
    },
];

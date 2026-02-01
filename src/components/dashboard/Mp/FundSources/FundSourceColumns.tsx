/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TFundSource } from "@/types/dashboard/MP/Fund/FundTypes";

export const FundSourceColumns: Column<TFundSource>[] = [
    {
        header: "Name",
        accessor: (fundSource) => (
            <span className="text-sm font-medium">{fundSource.name}</span>
        ),
        sortKey: "name",
    },
    {
        header: "Ministry",
        accessor: (fundSource) => (
            <span className="text-sm font-medium">{fundSource.ministry}</span>
        ),
        sortKey: "ministry",
    },
];

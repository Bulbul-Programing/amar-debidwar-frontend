/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { TServiceRecipient } from "@/types/dashboard/MP/serviceRecipient/serviceRecipient";

export const serviceRecipientColumns: Column<TServiceRecipient>[] = [
    {
        header: "Recipient",
        accessor: (recipient) => (
            <div className="flex flex-col">
                <span className="font-medium">{recipient.name}</span>
                <span className="text-xs text-muted-foreground">{recipient.phone}</span>
            </div>
        ),
        sortKey: "name",
    },
    {
        header: "Union",
        accessor: (recipient) => (
            <span className="text-sm">{recipient.union?.name ?? "—"}</span>
        )
    },
    {
        header: "Village",
        accessor: (recipient) => (
            <span className="text-sm">{recipient.village?.name ?? "—"}</span>
        )
    },
    {
        header: "Donation",
        accessor: (recipient) => (
            <span className="text-sm">{recipient.donation?.title ?? "N/A"}</span>
        )
    },
    {
        header: "Created",
        accessor: (recipient) => (
            <span className="text-xs text-muted-foreground">
                {dayjs(recipient.createdAt).format("DD MMM YYYY")}
            </span>
        ),
        sortKey: "createdAt",
    },
    {
        header: "Status",
        accessor: () => <Badge variant="default">Active</Badge>,
    },
    
];

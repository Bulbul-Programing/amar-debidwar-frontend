/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { TExpenseCategory } from "@/types/dashboard/MP/expenseCategory/expenseCategory";

export const ExpenseCategoryColumns: Column<TExpenseCategory>[] = [
    {
        header: "Category Name",
        accessor: (category) => (
            <span className="text-sm font-medium">
                {category.name}
            </span>
        ),
    },
    {
        header: "Category Name (BN)",
        accessor: (category) =>
            category.nameBn ? (
                <Badge variant="outline" className="font-normal">
                    {category.nameBn}
                </Badge>
            ) : (
                <span className="text-muted-foreground text-sm">
                    —
                </span>
            ),
    },
    {
        header: "Category ID",
        accessor: (category) => (
            <span className="text-xs text-muted-foreground">
                {category.id}
            </span>
        ),
    },
];

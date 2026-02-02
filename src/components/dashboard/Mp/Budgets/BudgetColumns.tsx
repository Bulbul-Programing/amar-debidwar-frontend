/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TBudgetResponse } from "@/types/dashboard/MP/budget/budgetTypes";

export const BudgetColumns: Column<TBudgetResponse>[] = [
    {
        header: "Title",
        accessor: (budget) => (
            <span className="text-sm font-medium">{budget.title}</span>
        ),
        sortKey: "title",
    },
    {
        header: "Budget Amount",
        accessor: (budget) => (
            <span className="text-sm font-semibold">
                ৳ {budget.budgetAmount.toLocaleString()}
            </span>
        ),
        sortKey: "budgetAmount",
    },
    {
        header: "Fiscal Year",
        accessor: (budget) => (
            <span className="text-sm">{budget.fiscalYear}</span>
        ),
        sortKey: "fiscalYear",
    },
    {
        header: "Receive Date",
        accessor: (budget) => (
            <span className="text-sm">
                {new Date(budget.receiveDate).toLocaleDateString()}
            </span>
        ),
        sortKey: "receiveDate",
    },
    {
        header: "Fund Source",
        accessor: (budget) => (
            <span className="text-sm font-medium">
                {budget.fundSource?.name}
            </span>
        ),
    },
    {
        header: "Ministry",
        accessor: (budget) => (
            <span className="text-sm">
                {budget.fundSource?.ministry}
            </span>
        ),
    },
];

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TExpense } from "@/types/dashboard/MP/expense/expense";

export const ExpenseColumns: Column<TExpense>[] = [
    {
        header: "Description",
        accessor: (expense) => (
            <span className="text-sm font-medium line-clamp-2">
                {expense.description}
            </span>
        ),
        sortKey: "description",
    },
    {
        header: "Amount",
        accessor: (expense) => (
            <span className="text-sm font-semibold">
                ৳ {expense.amount.toLocaleString()}
            </span>
        ),
        sortKey: "amount",
    },
    {
        header: "Expense Date",
        accessor: (expense) => (
            <span className="text-sm">
                {new Date(expense.expenseDate).toLocaleDateString("en-GB")}
            </span>
        ),
        sortKey: "expenseDate",
    },
    {
        header: "Category",
        accessor: (expense) => (
            <span className="text-sm">
                {expense.expenseCategory?.name}
            </span>
        ),
    },
    {
        header: "Project",
        accessor: (expense) => (
            <span className="text-sm font-medium">
                {expense.project?.title}
            </span>
        ),
    },
    {
        header: "Location",
        accessor: (expense) => (
            <span className="text-sm">
                {expense.project?.location}
            </span>
        ),
    },
];

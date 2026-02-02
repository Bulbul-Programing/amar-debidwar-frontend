/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Column } from "@/components/Shared/ManagementTable";
import { TProjectResponse } from "@/types/dashboard/MP/Projects/ProjectTypes";

export const ProjectColumns: Column<TProjectResponse>[] = [
    {
        header: "Title",
        accessor: (project) => (
            <span className="text-sm font-medium">
                {project.title}
            </span>
        ),
        sortKey: "title",
    },
    {
        header: "Location",
        accessor: (project) => (
            <span className="text-sm">
                {project.location}
            </span>
        ),
        sortKey: "location",
    },
    {
        header: "Estimated Cost",
        accessor: (project) => (
            <span className="text-sm font-semibold">
                ৳ {project.estimatedCost.toLocaleString()}
            </span>
        ),
        sortKey: "estimatedCost",
    },
    {
        header: "Actual Cost",
        accessor: (project) => (
            <span className="text-sm font-semibold">
                ৳ {project.actualCost?.toLocaleString() ?? "—"}
            </span>
        ),
        sortKey: "actualCost",
    },
    {
        header: "Fiscal Year",
        accessor: (project) => (
            <span className="text-sm">
                {project.budget?.fiscalYear}
            </span>
        )
    },
    {
        header: "Budget Title",
        accessor: (project) => (
            <span className="text-sm font-medium">
                {project.budget?.title}
            </span>
        ),
    },
    {
        header: "Fund Source",
        accessor: (project) => (
            <span className="text-sm">
                {project.budget?.fundSource?.name}
            </span>
        ),
    },
];

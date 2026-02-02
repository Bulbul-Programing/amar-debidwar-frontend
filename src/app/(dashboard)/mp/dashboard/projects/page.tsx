import AllProjectTable from '@/components/dashboard/Mp/Projects/AllProjectTable';
import ProjectManagementHeader from '@/components/dashboard/Mp/Projects/ProjectManagementHeader';
import ProjectSearch from '@/components/dashboard/Mp/Projects/ProjectSearch';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllBudgets } from '@/service/Dashboard/MP/budget/budgetManagement';
import { getAllProject } from '@/service/Dashboard/MP/project/projectManagement';
import ManagementTableSkeleton from '@/skeleton/TableSkeleton';
import React, { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const budgets = await getAllBudgets();
    const projects = await getAllProject(queryString)
    const totalPages = Math.ceil(
        (projects?.data?.meta?.total || 1) / (projects?.data?.meta?.limit || 1)
    );
    return (
        <div className="space-y-5">
            <ProjectManagementHeader budget={budgets?.data?.data} />
            <ProjectSearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={7} hasActions={true} rowCount={5} />}>
                <AllProjectTable budgets={budgets?.data?.data} projects={projects?.data?.data} />
            </Suspense>
            <TablePagination
                currentPage={projects?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />

        </div>
    );
};

export default page;
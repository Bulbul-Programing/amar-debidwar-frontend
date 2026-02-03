import AllComplainCategory from '@/components/dashboard/Mp/ComplainCategory/AllComplainCategory';
import ComplainCategoryManagementHeader from '@/components/dashboard/Mp/ComplainCategory/ComplainCategoryManagementHeader';
import ComplainCategorySearch from '@/components/dashboard/Mp/ComplainCategory/ComplainCategorySearch';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllComplaintCategories } from '@/service/Dashboard/MP/ComplainCategory/complainCategory';
import ManagementTableSkeleton from '@/skeleton/TableSkeleton';
import React, { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const complainCategories = await getAllComplaintCategories(queryString);

    const totalPages = Math.ceil(
        (complainCategories?.data?.meta?.total || 1) / (complainCategories?.data?.meta?.limit || 1)
    );
    return (
        <div className='space-y-5'>
            <ComplainCategoryManagementHeader />
            <ComplainCategorySearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={2} hasActions={true} rowCount={5} />}>
                <AllComplainCategory complainCategory={complainCategories?.data?.data} />
            </Suspense>
            <TablePagination
                currentPage={complainCategories?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
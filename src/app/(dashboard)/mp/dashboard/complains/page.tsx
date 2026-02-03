import AllComplain from '@/components/dashboard/Mp/Complains/AllComplain';
import ComplainManagementHeader from '@/components/dashboard/Mp/Complains/ComplainManagementHeader';
import ComplainSearch from '@/components/dashboard/Mp/Complains/ComplainSearch';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllComplains } from '@/service/Dashboard/MP/Complain/complainManagement';
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
    const complainCategories = await getAllComplaintCategories()
    const complains = await getAllComplains(queryString)

    const totalPages = Math.ceil(
        (complains?.data?.meta?.total || 1) / (complains?.data?.meta?.limit || 1)
    );
    return (
        <div className='space-y-5'>
            < ComplainManagementHeader complainCategory={complainCategories?.data?.data} />
            <ComplainSearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={6} hasActions={true} rowCount={5} />}>
                <AllComplain complains={complains?.data?.data} complainCategory={complainCategories?.data?.data} />
            </Suspense>
            <TablePagination
                currentPage={complains?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
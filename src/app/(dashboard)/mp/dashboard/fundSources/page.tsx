import AllFundSources from '@/components/dashboard/Mp/FundSources/AllFundSources';
import FundSourcesManagementHeader from '@/components/dashboard/Mp/FundSources/FundSourcesManagementHeader';
import FundSourcesSearch from '@/components/dashboard/Mp/FundSources/FundSourcesSearch';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllFoundSource } from '@/service/Dashboard/MP/FundSource/fundManagement';
import ManagementTableSkeleton from '@/skeleton/TableSkeleton';
import { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const fundSources = await getAllFoundSource(queryString);
    const totalPages = Math.ceil(
        (fundSources?.data?.meta?.total || 1) / (fundSources?.data?.meta?.limit || 1)
    );

    return (
        <div className="space-y-5">
            <FundSourcesManagementHeader />
            <FundSourcesSearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={2} hasActions={true} rowCount={5} />}>
                <AllFundSources fundSources={fundSources?.data?.data} />
            </Suspense>

            <TablePagination
                currentPage={fundSources?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
import AllowanceGrid from '@/components/Allowances/AllowanceGrid';
import AllowanceSearch from '@/components/Allowances/AllowanceSearch';
import AllowancesHeader from '@/components/Allowances/AllowancesHeader';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllServiceRecipients } from '@/service/Dashboard/MP/ServiceRecipient/ServiceRecipientManagement';
import React from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const allowances = await getAllServiceRecipients(queryString);
    const totalPages = Math.ceil(
        (allowances?.data?.meta?.total || 1) / (allowances?.data?.meta?.limit || 1)
    );
    return (
        <div>
            <AllowancesHeader />
            <div className='px-4 sm:px-6 lg:px-8 pt-5'><AllowanceSearch /></div>
            <AllowanceGrid allowances={allowances?.data?.data} />
            <div className='my-10'>
                <TablePagination
                    currentPage={allowances?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </div>
        </div>
    );
};

export default page;
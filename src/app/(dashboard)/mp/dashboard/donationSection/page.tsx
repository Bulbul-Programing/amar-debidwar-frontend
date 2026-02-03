import AllDonationSection from '@/components/dashboard/Mp/DonationSection/AllDonationSection';
import DonationManagementHeader from '@/components/dashboard/Mp/DonationSection/DonationManagementHeader';
import DonationSectionSearch from '@/components/dashboard/Mp/DonationSection/DonationSectionSearch';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllDonationSections } from '@/service/Dashboard/MP/DonationSection/donationSection';
import ManagementTableSkeleton from '@/skeleton/TableSkeleton';
import React, { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const donationSection = await getAllDonationSections(queryString)
    const totalPages = Math.ceil(
        (donationSection?.data?.meta?.total || 1) / (donationSection?.data?.meta?.limit || 1)
    );
    return (
        <div className='space-y-5'>
            <DonationManagementHeader />
            <DonationSectionSearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={3} hasActions={true} rowCount={5} />}>
                <AllDonationSection
                    donationSection={donationSection?.data?.data}
                />
            </Suspense>
            <TablePagination
                currentPage={donationSection?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
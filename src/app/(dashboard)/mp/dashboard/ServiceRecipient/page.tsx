import AllServiceRecipient from '@/components/dashboard/Mp/ServiceRecipient/AllServiceRecipient';
import ServiceRecipient from '@/components/dashboard/Mp/ServiceRecipient/ServiceRecipient';
import ServiceRecipientManagementHeader from '@/components/dashboard/Mp/ServiceRecipient/ServiceRecipientManagementHeader';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllDonationSections } from '@/service/Dashboard/MP/DonationSection/donationSection';
import { getAllServiceRecipients } from '@/service/Dashboard/MP/ServiceRecipient/ServiceRecipientManagement';
import { getAllUnion } from '@/service/Dashboard/MP/Union/UnionManagement';
import { getAllVillage } from '@/service/Dashboard/MP/Village/VillageManagement';
import ManagementTableSkeleton from '@/skeleton/TableSkeleton';
import React, { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const villages = await getAllVillage()
    const unions = await getAllUnion()
    const donationSection = await getAllDonationSections()

    const serviceRecipients = await getAllServiceRecipients(queryString)

    const totalPages = Math.ceil(
        (serviceRecipients?.data?.meta?.total || 1) / (serviceRecipients?.data?.meta?.limit || 1)
    );

    return (
        <div className='space-y-5'>
            <ServiceRecipientManagementHeader
                donations={donationSection?.data?.data}
                unions={unions?.data?.data}
                villages={villages?.data?.data}
            />
            <ServiceRecipient />
            <Suspense fallback={<ManagementTableSkeleton columnCount={8} hasActions={true} rowCount={6} />}>
                <AllServiceRecipient
                    donations={donationSection?.data?.data}
                    serviceRecipient={serviceRecipients?.data?.data}
                    unions={unions?.data?.data}
                    villages={villages?.data?.data}
                />
            </Suspense>
            <TablePagination
                currentPage={serviceRecipients?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
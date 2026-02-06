import AllowanceGrid from '@/components/Allowances/AllowanceGrid';
import TablePagination from '@/components/Shared/TablePagination';
import { getAllServiceRecipients } from '@/service/Dashboard/MP/ServiceRecipient/ServiceRecipientManagement';

const AllowancePage = async ({ queryString }: { queryString: string }) => {
    const allowances = await getAllServiceRecipients(queryString);
    const totalPages = Math.ceil(
        (allowances?.data?.meta?.total || 1) / (allowances?.data?.meta?.limit || 1)
    );
    return (
        <div>
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

export default AllowancePage;
import AllUsers from "@/components/dashboard/Mp/User/AllUsers";
import UserManagementHeader from "@/components/dashboard/Mp/User/UserManagementHeader";
import UserSearch from "@/components/dashboard/Mp/User/UserSearch";
import ManagementPageHeader from "@/components/Shared/ManagementPageHeader";
import TablePagination from "@/components/Shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/service/Dashboard/MP/userManagement";
import ManagementTableSkeleton from "@/skeleton/TableSkeleton";
import { Suspense } from "react";

const UserPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const userResult = await getAllUsers(queryString);
    const totalPages = Math.ceil(
        (userResult?.data?.meta?.total || 1) / (userResult?.data?.meta?.limit || 1)
    );
    
    return (
        <div className="space-y-4">
            <UserManagementHeader />
            <UserSearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={8} hasActions={true} rowCount={6} />}>
                <AllUsers users={userResult?.data?.data} />
            </Suspense>

            <TablePagination
                currentPage={userResult?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default UserPage;
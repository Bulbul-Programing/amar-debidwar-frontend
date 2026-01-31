import AllUsers from "@/components/dashboard/Mp/User/AllUsers";
import UserSearch from "@/components/dashboard/Mp/User/UserSearch";
import TablePagination from "@/components/Shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/service/Dashboard/MP/userManagement";

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
            <UserSearch />
            <AllUsers users={userResult?.data?.data} />
            <TablePagination
                currentPage={userResult?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default UserPage;
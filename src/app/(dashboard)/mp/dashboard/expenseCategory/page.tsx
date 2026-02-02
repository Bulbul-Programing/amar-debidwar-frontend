import AllExpenseCategory from "@/components/dashboard/Mp/ExpenceCategory/AllExpenseCategory";
import ExpenseCategoryManagementHeader from "@/components/dashboard/Mp/ExpenceCategory/ExpenseCategoryManagementHeader";
import ExpenseCategorySearch from "@/components/dashboard/Mp/ExpenceCategory/ExpenseCategorySearch";
import TablePagination from "@/components/Shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllExpenseCategories } from "@/service/Dashboard/MP/ExpenseCategory/expenseCategory";
import ManagementTableSkeleton from "@/skeleton/TableSkeleton";
import { Suspense } from "react";

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const expenseCategory = await getAllExpenseCategories(queryString)
    const totalPages = Math.ceil(
        (expenseCategory?.data?.meta?.total || 1) / (expenseCategory?.data?.meta?.limit || 1)
    );

    return (
        <div className="space-y-5">
            <ExpenseCategoryManagementHeader />
            <ExpenseCategorySearch />

            <Suspense fallback={<ManagementTableSkeleton columnCount={2} hasActions={true} rowCount={5} />}>
                <AllExpenseCategory expenseCategory={expenseCategory?.data?.data} />
            </Suspense>
            <TablePagination
                currentPage={expenseCategory?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
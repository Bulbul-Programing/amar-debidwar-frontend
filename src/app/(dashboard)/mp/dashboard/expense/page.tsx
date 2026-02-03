import AllExpenseTable from '@/components/dashboard/Mp/Expense/AllExpenseTable';
import ExpenseManagementHeader from '@/components/dashboard/Mp/Expense/ExpenseManagementHeader';
import TablePagination from '@/components/Shared/TablePagination';
import { queryStringFormatter } from '@/lib/formatters';
import { getAllExpenses } from '@/service/Dashboard/MP/Expense/expense';
import { getAllExpenseCategories } from '@/service/Dashboard/MP/ExpenseCategory/expenseCategory';
import { getAllProject } from '@/service/Dashboard/MP/project/projectManagement';
import ManagementTableSkeleton from '@/skeleton/TableSkeleton';
import { Suspense } from 'react';

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const expenseCategories = await getAllExpenseCategories();
    const projects = await getAllProject();
    const expense = await getAllExpenses(queryString)
    const totalPages = Math.ceil(
        (expense?.data?.meta?.total || 1) / (expense?.data?.meta?.limit || 1)
    );

    return (
        <div className="space-y-5">
            <ExpenseManagementHeader categories={expenseCategories?.data?.data} projects={projects?.data?.data} />
            <Suspense fallback={<ManagementTableSkeleton columnCount={7} hasActions={true} rowCount={5} />}>
                <AllExpenseTable
                    expense={expense?.data?.data}
                    expenseCategories={expenseCategories?.data?.data}
                    projects={projects?.data?.data}
                />
            </Suspense>
            <TablePagination
                currentPage={expense?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
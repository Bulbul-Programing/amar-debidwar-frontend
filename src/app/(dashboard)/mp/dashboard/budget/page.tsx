import AllBudget from "@/components/dashboard/Mp/Budgets/AllBudget";
import BudgetSearch from "@/components/dashboard/Mp/Budgets/BudgetSearch";
import BudgetsManagementHeader from "@/components/dashboard/Mp/Budgets/BudgetsManagementHeader";
import TablePagination from "@/components/Shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllBudgets } from "@/service/Dashboard/MP/budget/budgetManagement";
import { getAllFoundSource } from "@/service/Dashboard/MP/FundSource/fundManagement";
import ManagementTableSkeleton from "@/skeleton/TableSkeleton";
import { Suspense } from "react";

const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);

    const budgets = await getAllBudgets(queryString);
    const fundSources = await getAllFoundSource()
    const totalPages = Math.ceil(
        (budgets?.data?.meta?.total || 1) / (budgets?.data?.meta?.limit || 1)
    );

    return (
        <div className="space-y-5">
            <BudgetsManagementHeader fundSources={fundSources?.data?.data} />
            <BudgetSearch />
            <Suspense fallback={<ManagementTableSkeleton columnCount={6} hasActions={true} rowCount={5} />}>
                <AllBudget budgets={budgets?.data?.data} fundSources={fundSources?.data?.data} />
            </Suspense>
            <TablePagination
                currentPage={budgets?.data?.meta?.page || 1}
                totalPages={totalPages || 1}
            />
        </div>
    );
};

export default page;
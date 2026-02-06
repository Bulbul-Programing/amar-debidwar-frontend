import AccountsHeader from "@/components/Accounts/AccountsHeader";
import AllBudget from "@/components/Accounts/AllBudget";
import AllFundSource from "@/components/Accounts/AllFundSource";
import TablePagination from "@/components/Shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllBudgets, getAllBudgetsByFundSource } from "@/service/Dashboard/MP/budget/budgetManagement";
import { getAllFoundSource } from "@/service/Dashboard/MP/FundSource/fundManagement";
import BudgetCardsSkeleton from "@/skeleton/BudgetCardsSkeleton";
import { Suspense } from "react";

const page = async ({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj || {});
    const sourceId = searchParamsObj?.fundSource ? searchParamsObj?.fundSource : ""
    const allFundSource = await getAllFoundSource()
    
    const budgets = sourceId ? await getAllBudgetsByFundSource(sourceId as string) : await getAllBudgets(queryString)


    const totalPages = Math.ceil(
        (budgets?.data?.meta?.total || 1) / (budgets?.data?.meta?.limit || 1)
    );

    return (
        <div>
            <AccountsHeader />
            <AllFundSource fundSources={allFundSource?.data?.data} />
            <Suspense fallback={<BudgetCardsSkeleton />}>
                <AllBudget budgets={budgets?.data?.data} />
            </Suspense>
            <div className='my-5'>
                <TablePagination
                    currentPage={budgets?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </div>
        </div>
    );
};

export default page;
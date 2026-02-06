import AllBudget from "@/components/Accounts/AllBudget";
import AllFundSource from "@/components/Accounts/AllFundSource";
import TablePagination from "@/components/Shared/TablePagination";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllBudgets, getAllBudgetsByFundSource } from "@/service/Dashboard/MP/budget/budgetManagement";
import { getAllFoundSource } from "@/service/Dashboard/MP/FundSource/fundManagement";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AccountPage = async ({ searchObj }: { searchObj: any }) => {
    const queryString = queryStringFormatter(searchObj || {});
    const sourceId = searchObj?.fundSource ? searchObj?.fundSource : ""
    const allFundSource = await getAllFoundSource()

    const budgets = sourceId ? await getAllBudgetsByFundSource(sourceId as string) : await getAllBudgets(queryString)


    const totalPages = Math.ceil(
        (budgets?.data?.meta?.total || 1) / (budgets?.data?.meta?.limit || 1)
    );
    return (
        <div>
            <AllFundSource fundSources={allFundSource?.data?.data} />

            <AllBudget budgets={budgets?.data?.data} />
            <div className='my-5'>
                <TablePagination
                    currentPage={budgets?.data?.meta?.page || 1}
                    totalPages={totalPages || 1}
                />
            </div>
        </div>
    );
};

export default AccountPage;
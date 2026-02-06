import AccountPage from "@/components/Accounts/AccountPage";
import AccountsHeader from "@/components/Accounts/AccountsHeader";
import BudgetCardsSkeleton from "@/skeleton/BudgetCardsSkeleton";
import { Suspense } from "react";


const page = async ({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;

    return (
        <div>
            <AccountsHeader />
            <Suspense fallback={<BudgetCardsSkeleton />}>
                <AccountPage searchObj={searchParamsObj} />
            </Suspense>
        </div>
    );
};

export default page;
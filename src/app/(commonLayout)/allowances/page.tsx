import AllowancePage from "@/components/Allowances/AllowancePage";
import AllowanceSearch from "@/components/Allowances/AllowanceSearch";
import AllowancesHeader from "@/components/Allowances/AllowancesHeader";
import { queryStringFormatter } from "@/lib/formatters";
import AllowancesPageSkeleton from "@/skeleton/AllowancesPageSkeleton";
import { Suspense } from "react";


const page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    return (
        <div>
            <AllowancesHeader />
            <div className='px-4 sm:px-6 lg:px-8 pt-5'><AllowanceSearch /></div>
            <Suspense fallback={<AllowancesPageSkeleton />}>
                <AllowancePage queryString={queryString} />
            </Suspense>
        </div>
    );
};

export default page;
import AllBudgetByFundSource from './AllBudgetByFundSource';
import { TFundSource } from '@/types/dashboard/MP/Fund/FundTypes';

const AllFundSource = async ({ fundSources }: { fundSources: TFundSource[] }) => {
    return (
        <div className='flex gap-x-5 my-5 mx-5 md:mx-10'>
            <AllBudgetByFundSource fundSource={fundSources} />
        </div>
    );
};

export default AllFundSource;
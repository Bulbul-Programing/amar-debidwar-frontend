import { getAllFoundSource } from '@/service/Dashboard/MP/FundSource/fundManagement';
import AllBudgetByFundSource from './AllBudgetByFundSource';

const AllFundSource = async () => {
    const allFundSource = await getAllFoundSource()

    return (
        <div className='flex gap-x-5 my-5 mx-5 md:mx-10'>
            <AllBudgetByFundSource fundSource={allFundSource?.data?.data} />
        </div>
    );
};

export default AllFundSource;
import ComplaintPageHeader from '@/components/Complain/ComplaintPageHeader';
import { getAllComplaintCategories } from '@/service/Dashboard/MP/ComplainCategory/complainCategory';

const page = async () => {
    const complainCategories = await getAllComplaintCategories()
    return (
        <div>
            <ComplaintPageHeader complainCategory={complainCategories?.data?.data} />
        </div>
    );
};

export default page;
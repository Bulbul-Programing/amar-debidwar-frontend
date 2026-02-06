import { getAllComplaintCategories } from '@/service/Dashboard/MP/ComplainCategory/complainCategory';
import ComplaintPageHeader from './ComplaintPageHeader';

const ComplainPage = async() => {
    const complainCategories = await getAllComplaintCategories()
    return (
        <div>
            <ComplaintPageHeader complainCategory={complainCategories?.data?.data} />
        </div>
    );
};

export default ComplainPage;
import ComplainPage from '@/components/Complain/ComplainPage';
import ComplaintPageHeaderSkeleton from '@/skeleton/ComplaintPageHeaderSkeleton';
import { Suspense } from 'react';

const page = async () => {

    return (
        <div>
            <Suspense fallback={<ComplaintPageHeaderSkeleton />}>
                <ComplainPage />
            </Suspense>
        </div>
    );
};

export default page;
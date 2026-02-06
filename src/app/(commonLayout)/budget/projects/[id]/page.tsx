import BudgetDetailsPage from '@/components/Budget/BudgetDetailsPage';
import BudgetSkeleton from '@/skeleton/BudgetSkeleton';
import { Suspense } from 'react';

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params

    return (
        <div>
            <Suspense fallback={<BudgetSkeleton />}>
                <BudgetDetailsPage projectId={id} />
            </Suspense>
        </div>
    );
};

export default page;
import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
           <ManagementLoadingSkeleton
                title="Expense Category"
                description="Manage all expense category."
                columnCount={3}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
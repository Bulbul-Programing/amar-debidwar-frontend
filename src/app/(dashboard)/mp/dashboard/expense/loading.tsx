import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Expense Management"
                description="Manage all Expense."
                columnCount={6}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Budget Management"
                description="Manage all budgets."
                columnCount={8}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
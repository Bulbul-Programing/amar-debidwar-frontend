import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Complain Category Management"
                description="Manage all Complain Category."
                columnCount={5}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
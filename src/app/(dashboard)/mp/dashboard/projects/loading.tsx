import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Project Management"
                description="Manage all Project."
                columnCount={7}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
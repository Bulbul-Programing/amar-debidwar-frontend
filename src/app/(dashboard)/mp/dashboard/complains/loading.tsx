import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Complain Management"
                description="Manage all Complains."
                columnCount={6}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
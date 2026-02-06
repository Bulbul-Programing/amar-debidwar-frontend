import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Found Source Management"
                description="Manage all fund sources within the application."
                columnCount={2}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="Donation Section Management"
                description="Manage all donations section."
                columnCount={2}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
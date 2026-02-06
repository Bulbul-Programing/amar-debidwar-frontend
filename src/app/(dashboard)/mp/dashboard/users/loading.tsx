import ManagementLoadingSkeleton from '@/skeleton/ManagementHeaderSkeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <ManagementLoadingSkeleton
                title="User Management"
                description="Manage all users within the application."
                columnCount={7}
                hasAction={true}
                hasActions={true}
            />
        </div>
    );
};

export default loading;
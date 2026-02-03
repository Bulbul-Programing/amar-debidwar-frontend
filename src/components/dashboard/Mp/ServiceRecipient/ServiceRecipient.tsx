import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';
import React from 'react';

const ServiceRecipient = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search Service Recipient..." />
            <RefreshButton />
        </div>
    );
};

export default ServiceRecipient;
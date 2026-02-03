import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';
import React from 'react';

const ComplainSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search complain category..." />
            <RefreshButton />
        </div>
    );
};

export default ComplainSearch;
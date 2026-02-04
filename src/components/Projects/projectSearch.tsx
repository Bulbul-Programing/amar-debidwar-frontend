import React from 'react';
import SearchFilter from '../Shared/SearchFilter';
import RefreshButton from '../Shared/RefreshButton';

const projectSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search Project..." />
            <RefreshButton />
        </div>
    );
};

export default projectSearch;
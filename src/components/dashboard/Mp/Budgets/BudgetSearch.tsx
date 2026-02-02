import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';
import React from 'react';

const BudgetSearch = () => {
    return (
        <div>
            <div className="flex items-center gap-3">
                <SearchFilter paramName="searchTerm" placeholder="Search Budget..." />
                <RefreshButton />
            </div>
        </div>
    );
};

export default BudgetSearch;
import React from 'react';
import SearchFilter from '../Shared/SearchFilter';
import RefreshButton from '../Shared/RefreshButton';

const ProjectSearchComponent = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="প্রজেক্ট খুজুন..." />
            <RefreshButton text='রিফ্রেশ' />
        </div>
    );
};

export default ProjectSearchComponent;
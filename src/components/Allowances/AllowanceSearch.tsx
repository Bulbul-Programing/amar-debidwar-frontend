import React from 'react';
import SearchFilter from '../Shared/SearchFilter';
import RefreshButton from '../Shared/RefreshButton';

const AllowanceSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="সেবা গ্রহনকারী খুজুন..." />
            <RefreshButton text='রিফ্রেশ'/>
        </div>
    );
};

export default AllowanceSearch;
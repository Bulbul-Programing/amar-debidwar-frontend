import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';
import SelectFilter from '@/components/Shared/SelectFilter';
import { TUserCategory } from '@/types/User/TUserInfo';
import React from 'react';

const UserSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search User..." />
            {/* <SelectFilter
                paramName="category"
                placeholder="Category"
                defaultValue="Select Category"
                options={[...TUserCategory]}
            /> */}
            <RefreshButton />
        </div>
    );
};

export default UserSearch;
import RefreshButton from '@/components/Shared/RefreshButton';
import SearchFilter from '@/components/Shared/SearchFilter';

const DonationSectionSearch = () => {
    return (
        <div className="flex items-center gap-3">
            <SearchFilter paramName="searchTerm" placeholder="Search Budget..." />
            <RefreshButton />
        </div>
    );
};

export default DonationSectionSearch;
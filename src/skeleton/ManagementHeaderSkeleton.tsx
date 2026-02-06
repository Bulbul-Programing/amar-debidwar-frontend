import ManagementPageHeader from '@/components/Shared/ManagementPageHeader';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import ManagementTableSkeleton from './TableSkeleton';
interface ManagementTableSkeletonProps {
    columnCount: number;
    rowCount?: number;
    hasActions?: boolean;
    hasAction?: boolean
    title: string
    description: string
}
const ManagementLoadingSkeleton = ({ columnCount, description, title, hasAction, hasActions, rowCount }: ManagementTableSkeletonProps) => {
    return (
        <div className='space-y-5'>
            <div className="flex items-start justify-between gap-4">
                <ManagementPageHeader
                    title={title}
                    description={description}
                />

                {hasAction && (
                    <Skeleton className="h-10 w-32 rounded-md" /> /* button */
                )}
            </div>
            <div className="flex items-center gap-3">
                {/* Search input */}
                <Skeleton className="h-10 w-65 rounded-md" />

                {/* (Optional) Select filter placeholder */}
                {/* <Skeleton className="h-10 w-[180px] rounded-md" /> */}

                {/* Refresh button */}
                <Skeleton className="h-10 w-10 rounded-md" />
            </div>
            <ManagementTableSkeleton
                columnCount={columnCount}
                hasActions={hasActions}
                rowCount={rowCount}
            />
        </div>
    );
};

export default ManagementLoadingSkeleton;
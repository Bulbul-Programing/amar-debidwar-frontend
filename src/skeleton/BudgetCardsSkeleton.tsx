"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface BudgetCardsSkeletonProps {
    count?: number;
}

const BudgetCardsSkeleton = ({ count = 6 }: BudgetCardsSkeletonProps) => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: count }).map((_, index) => (
                    <div
                        key={index}
                        className="relative rounded-3xl border border-border bg-card p-6 shadow-sm"
                    >
                        {/* Fiscal Year Badge */}
                        <Skeleton className="absolute top-4 right-4 h-6 w-20 rounded-full" />

                        {/* Title */}
                        <Skeleton className="h-5 w-3/4 mb-2" />

                        {/* Description */}
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-5/6 mb-4" />

                        {/* Budget Amount */}
                        <div className="flex items-center gap-3 mb-4">
                            <Skeleton className="h-10 w-10 rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-5 w-28" />
                            </div>
                        </div>

                        {/* Meta Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-40" />
                            </div>

                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>

                        {/* Fund Source */}
                        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BudgetCardsSkeleton;
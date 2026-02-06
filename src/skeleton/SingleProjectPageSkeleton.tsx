"use client";

import { Skeleton } from "@/components/ui/skeleton";

const SingleProjectPageSkeleton = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Header Skeleton */}
            <header className="bg-primary py-12 px-4 sm:px-6 lg:px-8 text-center shadow-lg">
                <Skeleton className="h-12 w-3/4 max-w-3xl mx-auto rounded-md" />
                <div className="mt-4 space-y-2">
                    <Skeleton className="h-5 w-full max-w-2xl mx-auto rounded-md" />
                    <Skeleton className="h-5 w-5/6 max-w-xl mx-auto rounded-md" />
                </div>
            </header>

            {/* Main Content Skeleton */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="rounded-3xl border border-foreground shadow-lg p-8 flex flex-col gap-8 bg-card">

                    {/* Badges */}
                    <div className="flex flex-wrap gap-3">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>

                    {/* Location & Costs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-5 w-full max-w-sm" />
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-48" />
                        <div className="relative">
                            <Skeleton className="h-4 w-full rounded-full" />
                            <Skeleton className="h-3 w-12 absolute right-2 -top-5" />
                        </div>
                    </div>

                    {/* Budget & Fund Source */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-5 w-full max-w-sm" />
                        ))}
                    </div>

                    {/* Full Description */}
                    <div className="space-y-3">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-24 w-full rounded-lg" />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SingleProjectPageSkeleton;
"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ComplaintPageHeaderSkeleton = () => {
    return (
        <div className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/15 via-background to-primary/10 mx-5 md:mx-10 p-6 sm:p-8 shadow-sm my-5">
            {/* Decorative blurred shapes (keep for layout parity) */}
            <div className="absolute -top-14 -right-14 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Left Content */}
                <div className="space-y-4">
                    {/* Icon + Badge */}
                    <div className="flex items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-2xl" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>

                    {/* Title */}
                    <Skeleton className="h-7 w-56 sm:h-8 sm:w-72" />

                    {/* Description */}
                    <div className="space-y-2 max-w-2xl">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                    </div>

                    {/* Info Chips */}
                    <div className="flex flex-wrap gap-2">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                </div>

                {/* Right Action Button */}
                <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-36 rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default ComplaintPageHeaderSkeleton;
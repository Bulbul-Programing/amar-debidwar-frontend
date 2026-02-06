import { Skeleton } from "@/components/ui/skeleton";

const AllowancesPageSkeleton = () => {
    return (
        <div>
            {/* Main Content Skeleton */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="bg-card shadow-2xl rounded-3xl p-6 flex flex-col justify-between"
                        >
                            {/* Card Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    {/* Initials Badge */}
                                    <Skeleton className="h-12 w-12 rounded-full" />

                                    {/* Name + Phone */}
                                    <div className="space-y-2">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-4 w-32" />
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="border-t border-border mt-4 mb-4"></div>

                            {/* Allowance Type Badge */}
                            <Skeleton className="h-6 w-36 rounded-full mb-4" />

                            {/* Details */}
                            <div className="grid grid-cols-1 gap-3 text-sm">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>

                            {/* Action Button / Modal Trigger */}
                            <Skeleton className="h-10 w-full rounded-xl mt-6" />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default AllowancesPageSkeleton;
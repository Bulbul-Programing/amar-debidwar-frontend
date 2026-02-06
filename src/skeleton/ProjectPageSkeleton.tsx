import { Skeleton } from '@/components/ui/skeleton';

const ProjectPageSkeleton = () => {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between border border-gray-100"
                    >
                        {/* Title */}
                        <Skeleton className="h-6 w-3/4 mb-2" />

                        {/* Description */}
                        <Skeleton className="h-4 w-full mb-4" />

                        {/* Badges */}
                        <div className="flex gap-2 mb-4">
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-4">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-5/6" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-2 mb-4">
                            <Skeleton className="h-3 w-full rounded-full" />
                            <Skeleton className="h-3 w-12 ml-auto" />
                        </div>

                        {/* Button */}
                        <Skeleton className="h-10 w-full rounded-xl" />
                    </div>
                ))}
            </div>
        </main>
    );
};

export default ProjectPageSkeleton;
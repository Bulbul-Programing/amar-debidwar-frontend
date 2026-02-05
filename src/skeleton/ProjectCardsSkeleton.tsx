"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface ProjectCardsSkeletonProps {
    count?: number;
}

const ProjectCardsSkeleton = ({ count = 6 }: ProjectCardsSkeletonProps) => {
    return (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white shadow-lg rounded-3xl p-6 flex flex-col justify-between border border-gray-100"
                >
                    {/* Project Title */}
                    <Skeleton className="h-6 w-3/4 mb-2" />

                    {/* Description */}
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-4" />

                    {/* Badges */}
                    <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-24 rounded-full" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>

                    {/* Project Details */}
                    <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-40" />
                        </div>

                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-36" />
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                        <Skeleton className="h-3 w-full rounded-full" />
                        <Skeleton className="h-3 w-12 mt-2 ml-auto" />
                    </div>

                    {/* Button */}
                    <Skeleton className="h-10 w-full rounded-xl mt-auto" />
                </div>
            ))}
        </div>
    );
};

export default ProjectCardsSkeleton;
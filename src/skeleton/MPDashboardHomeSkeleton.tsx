"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const MPDashboardHomeSkeleton = () => {
    return (
        <div className="space-y-8">
            {/* Summary Cards Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Card key={i} className="rounded-2xl shadow-md">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Skeleton className="h-12 w-12 rounded-xl" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Section Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart Skeleton */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <Skeleton className="h-5 w-40" />
                    </CardHeader>
                    <CardContent className="h-80 flex items-end gap-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton
                                key={i}
                                className="w-6 rounded-md"
                                style={{ height: `${40 + i * 10}px` }}
                            />
                        ))}
                    </CardContent>
                </Card>

                {/* Pie Chart Skeleton */}
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <Skeleton className="h-5 w-48" />
                    </CardHeader>
                    <CardContent className="h-80 flex items-center justify-center">
                        <Skeleton className="h-56 w-56 rounded-full" />
                    </CardContent>
                </Card>
            </div>

            {/* Project Utilization Skeleton */}
            <Card className="rounded-2xl shadow-md">
                <CardHeader>
                    <Skeleton className="h-5 w-44" />
                </CardHeader>
                <CardContent className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-4 w-40" />
                                <Skeleton className="h-6 w-14 rounded-full" />
                            </div>
                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
};

export default MPDashboardHomeSkeleton;
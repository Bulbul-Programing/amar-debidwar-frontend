import { Skeleton } from "@/components/ui/skeleton";

const BudgetSkeleton = () => {
    return (
        <section className="space-y-8 animate-pulse">
            {/* ================= HERO HEADER SKELETON ================= */}
            <div className="relative overflow-hidden rounded-4xl border bg-card p-4 md:p-8 shadow-sm mt-5 mb-5 md:mb-10 mx-5 md:mx-10">
                {/* Title & Subtitle */}
                <Skeleton className="h-6 w-40 mb-4 rounded-full" />
                <Skeleton className="h-10 w-3/4 mb-2 rounded-lg" />
                <Skeleton className="h-5 w-1/2 mb-4 rounded-md" />

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mt-8">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-20 rounded-lg md:rounded-3xl" />
                    ))}
                </div>

                {/* Decorative circles */}
                <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            </div>

            {/* ================= PROJECTS GRID SKELETON ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-5 md:m-10">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all h-72 flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-4 space-y-2 border-b">
                            <Skeleton className="h-5 w-3/4 rounded-md" />
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-4 flex-1">
                            <Skeleton className="h-4 w-1/2 rounded-md" />
                            <div className="grid grid-cols-2 gap-3">
                                <Skeleton className="h-16 w-full rounded-lg" />
                                <Skeleton className="h-16 w-full rounded-lg" />
                            </div>
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-3/4 rounded-md" />
                                <Skeleton className="h-4 w-1/2 rounded-md" />
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between items-center p-4 text-xs">
                            <Skeleton className="h-4 w-16 rounded-md" />
                            <Skeleton className="h-4 w-20 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BudgetSkeleton;
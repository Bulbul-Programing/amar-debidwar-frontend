const ProjectDetailsSkeleton = () => {
    return (
        <div className="min-h-screen bg-background animate-pulse">
            {/* Header Skeleton */}
            <header className="bg-primary/20 py-12 px-4 sm:px-6 lg:px-8 text-center shadow-lg">
                <div className="h-10 w-2/3 mx-auto bg-muted rounded-lg" />
                <div className="mt-4 h-5 w-1/2 mx-auto bg-muted rounded-md" />
            </header>

            {/* Main Content Skeleton */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="rounded-3xl border border-foreground/20 shadow-lg p-8 flex flex-col gap-8 bg-card">

                    {/* Badges */}
                    <div className="flex gap-3">
                        <div className="h-6 w-24 bg-muted rounded-full" />
                        <div className="h-6 w-20 bg-muted rounded-full" />
                    </div>

                    {/* Location & Costs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-5 w-full bg-muted rounded-md" />
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div>
                        <div className="h-5 w-40 bg-muted rounded-md mb-3" />
                        <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                            <div className="bg-primary/40 h-4 w-1/3 rounded-full" />
                        </div>
                    </div>

                    {/* Budget & Fund Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-5 w-full bg-muted rounded-md" />
                        ))}
                    </div>

                    {/* Description */}
                    <div>
                        <div className="h-6 w-56 bg-muted rounded-md mb-3" />
                        <div className="space-y-2">
                            <div className="h-4 w-full bg-muted rounded" />
                            <div className="h-4 w-full bg-muted rounded" />
                            <div className="h-4 w-3/4 bg-muted rounded" />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default ProjectDetailsSkeleton;
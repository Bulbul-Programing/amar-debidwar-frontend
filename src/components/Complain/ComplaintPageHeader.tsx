import { Badge } from "@/components/ui/badge";
import { MessageSquareWarning } from "lucide-react";
import CreateComplainButton from "./CreateComplainButton";
import { TComplaintCategory } from "@/types/dashboard/MP/ComplainCategory/complainCategory";

const ComplaintPageHeader = ({ complainCategory }: { complainCategory: TComplaintCategory[] }) => {
    return (
        <div className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-primary/15 via-background to-primary/10 mx-5 md:mx-10 p-6 sm:p-8 shadow-sm my-5">
            {/* Decorative blurred shapes */}
            <div className="absolute -top-14 -right-14 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                {/* Left Content */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary shadow-sm">
                            <MessageSquareWarning className="h-6 w-6" />
                        </div>

                        <Badge
                            variant="secondary"
                            className="rounded-full px-4 py-1 text-xs font-medium"
                        >
                            নাগরিক সেবা
                        </Badge>
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        অভিযোগ ব্যবস্থাপনা
                    </h1>

                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        আপনার যেকোনো অভিযোগ সহজে জমা দিন, অগ্রগতি পর্যবেক্ষণ করুন এবং
                        স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে দ্রুত সমাধান নিশ্চিত করুন।
                    </p>

                    {/* Info Chips */}
                    <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                            স্বচ্ছ প্রক্রিয়া
                        </span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                            দ্রুত সমাধান
                        </span>
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                            নাগরিক অধিকার
                        </span>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    <CreateComplainButton complainCategory={complainCategory} />
                </div>
            </div>
        </div>
    );
};

export default ComplaintPageHeader;
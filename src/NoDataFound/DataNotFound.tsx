import { Inbox } from 'lucide-react';
import React from 'react';
type NoDataFoundProps = {
    title?: string;
    description?: string;
};
const DataNotFound = ({
    title = "কোনো তথ্য পাওয়া যায়নি",
    description = "এই মুহূর্তে প্রদর্শনের জন্য কোনো তথ্য উপলব্ধ নেই। পরে আবার চেষ্টা করুন।",
}: NoDataFoundProps) => {
    return (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Inbox size={32} />
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-foreground mb-2">
                {title}
            </h3>

            {/* Description */}
            <p className="max-w-sm text-sm text-muted-foreground">
                {description}
            </p>
        </div>
    );
};

export default DataNotFound;
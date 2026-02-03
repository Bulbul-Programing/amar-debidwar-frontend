/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Column } from "@/components/Shared/ManagementTable";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash } from "lucide-react";
import { TDonationSection } from "@/types/dashboard/MP/DonationSection/donationSection";

export const DonationSectionColumns: Column<TDonationSection>[] = [
    {
        header: "Photo",
        accessor: (donation) => {
            const firstLetter = donation.title?.charAt(0)?.toUpperCase();

            return (
                <div className="flex items-center gap-2">
                    {donation.photo ? (
                        <div className="relative h-10 w-10 overflow-hidden rounded-md border">
                            <Image
                                src={donation.photo}
                                alt={donation.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-sm font-semibold text-primary">
                            {firstLetter}
                        </div>
                    )}
                </div>
            );
        }
    },
    {
        header: "Title",
        accessor: (donation) => (
            <span className="text-sm font-medium text-gray-900">
                {donation.title}
            </span>
        ),
    },
];

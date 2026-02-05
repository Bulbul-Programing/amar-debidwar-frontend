import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { TServiceRecipient } from "@/types/dashboard/MP/serviceRecipient/serviceRecipient";
import { FaIdCard } from "react-icons/fa6";
import AllowanceDetailsModal from "./AllowanceDetailsModal";
import DataNotFound from "@/NoDataFound/DataNotFound";

interface Props {
    allowances: TServiceRecipient[];
}

export default function AllowanceGrid({ allowances }: Props) {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            {allowances.length === 0 ? (
                <DataNotFound
                    title="কোনো ভাতা তথ্য পাওয়া যায়নি"
                    description="এই এলাকায় এখনো কোনো ভাতা বরাদ্দ দেওয়া হয়নি।"
                />
            ) : (
                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {allowances.map((allowance) => {
                        const initials = allowance.name
                            .split(" ")
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase();

                        return (
                            <div
                                key={allowance.id}
                                className="bg-card shadow-2xl rounded-3xl p-6 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
                            >
                                {/* Header with Badge */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        {/* Badge with initials */}
                                        <div className="bg-primary text-primary-foreground w-12 h-12 flex items-center justify-center rounded-full font-bold text-lg shadow-md">
                                            {initials}
                                        </div>
                                        {/* User Info */}
                                        <div className="flex flex-col">
                                            <h2 className="text-lg font-semibold text-gray-900 truncate">
                                                {allowance.name}
                                            </h2>
                                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                                <FaPhone className="text-primary" /> {allowance.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-border mt-4 mb-4"></div>
                                <div>
                                    <div className="mb-4">
                                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold text-sm shadow-sm">
                                            {allowance.donation.title}
                                        </span>
                                    </div>
                                </div>
                                {/* Details Section */}
                                <div className="grid grid-cols-1 gap-3 text-gray-700 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-primary" />
                                        <span>
                                            {allowance.village.name}, {allowance.union.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaIdCard className="text-primary" />
                                        <span>জাতীয় পরিচয়পত্র: {allowance.nidNumber}</span>
                                    </div>
                                    <div className="flex gap-x-1">
                                        <span className="font-medium ">ঠিকানা:</span>{" "}
                                        <p className="truncate">{allowance.address}</p>
                                    </div>
                                </div>

                                <AllowanceDetailsModal serviceRecipient={allowance} />
                            </div>
                        );
                    })}
                </div>
            )}
        </main>
    );
}

"use client";
import { TServiceRecipient } from "@/types/dashboard/MP/serviceRecipient/serviceRecipient";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaPhone, FaMapMarkerAlt, FaIdCard, FaUsers, FaCalendarAlt } from "react-icons/fa";

const AllowanceDetailsModal = ({
    serviceRecipient,
}: {
    serviceRecipient: TServiceRecipient;
}) => {
    const initials = serviceRecipient.name
        .split(" ")
        .slice(0, 2)
        .map((n) => n[0])
        .join("")
        .toUpperCase();

    const createdAt = new Date(serviceRecipient.createdAt).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const updatedAt = new Date(serviceRecipient.updateAt).toLocaleDateString("bn-BD", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-4 bg-primary text-primary-foreground py-2 px-4 rounded-xl hover:bg-primary/90 transition font-medium">
                    বিস্তারিত দেখুন
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md w-full p-6 bg-card text-card-foreground rounded-2xl shadow-xl">
                <DialogHeader className="text-center">
                    <DialogTitle className="text-2xl font-bold">
                        {serviceRecipient.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground">
                        ভাতা গ্রহীতার বিস্তারিত তথ্য
                    </p>
                </DialogHeader>
                <div className="border-t border-border"></div>
                <div className="flex items-center gap-4">
                    {/* Badge */}
                    <div className="bg-primary text-primary-foreground w-14 h-14 flex items-center justify-center rounded-full font-bold text-xl shadow-md">
                        {initials}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                        <p className="text-gray-900 font-semibold text-lg">{serviceRecipient.name}</p>
                        <p className="flex items-center gap-2 text-gray-500">
                            <FaPhone className="text-primary" /> {serviceRecipient.phone}
                        </p>
                        <p className="flex items-center gap-2 text-gray-500">
                            <FaIdCard className="text-primary" /> NID: {serviceRecipient.nidNumber}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-border"></div>

                {/* Location Info */}
                <div className="grid grid-cols-1 gap-3 text-gray-700">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-primary" />
                        <span>{serviceRecipient.village.name}, {serviceRecipient.union.name}</span>
                    </div>
                    <div>
                        <span className="font-medium">ঠিকানা:</span> {serviceRecipient.address}
                    </div>
                </div>
                <div className="border-t border-border"></div>
                {/* Donation Info */}
                <div className="bg-green-50 p-4 rounded-xl shadow-sm">
                    <p className="text-green-800 font-semibold">ভাতা/দান: {serviceRecipient.donation.title}</p>
                </div>
                <div className="border-t border-border"></div>
                {/* Created & Updated */}
                <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" /> তৈরি হয়েছে: {createdAt}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" /> শেষ হালনাগাদ: {updatedAt}
                    </p>
                </div>

                {/* Footer Buttons */}
                <DialogFooter className="flex justify-end gap-3">
                    <DialogClose asChild>
                        <Button variant="default">বাতিল</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AllowanceDetailsModal;

"use client"

import ManagementPageHeader from "@/components/Shared/ManagementPageHeader";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ServiceRecipientFormDialog from "./ServiceRecipientFormDialog";
import { TDonationSection, TUnion, TVillage } from "@/types/dashboard/MP/serviceRecipient/serviceRecipient";

interface ServiceRecipientManagementProps {
    unions: TUnion[];
    villages: TVillage[];
    donations: TDonationSection[]
}

const ServiceRecipientManagementHeader = ({ donations, unions, villages }: ServiceRecipientManagementProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        setIsDialogOpen(false)
        startTransition(() => {
            router.refresh();
        });
    };

    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Force remount
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };
    return (
        <div>
            <ServiceRecipientFormDialog
                key={dialogKey}
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSuccess={handleSuccess}
                donations={donations}
                unions={unions}
                villages={villages}
            />

            <ManagementPageHeader
                title="Service Recipient Management"
                description="Manage all Service Recipient."
                action={{
                    label: "Add Service Recipient",
                    icon: Plus,
                    onClick: handleOpenDialog,
                }}
            />
        </div>
    );
};

export default ServiceRecipientManagementHeader;
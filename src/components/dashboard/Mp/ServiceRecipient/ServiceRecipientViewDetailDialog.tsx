/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import { TServiceRecipient } from "@/types/dashboard/MP/serviceRecipient/serviceRecipient";

export interface IServiceRecipientViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    recipient: TServiceRecipient | null;
}

const InfoRow = ({
    label,
    value,
}: {
    label: string;
    value?: React.ReactNode;
}) => (
    <div className="grid grid-cols-3 gap-2 text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="col-span-2 font-medium">{value ?? "—"}</span>
    </div>
);

const ServiceRecipientViewDetailDialog = ({
    open,
    onClose,
    recipient,
}: IServiceRecipientViewDetailDialogProps) => {
    if (!recipient) return null;

    const donationTitle = recipient.donation?.title ?? "N/A";
    const donationPhoto = recipient.donation?.photo;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>Service Recipient Details</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    {/* Recipient Header */}
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>
                                {recipient.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="font-semibold">{recipient.name}</h3>
                            <p className="text-sm text-muted-foreground">
                                {recipient.phone}
                            </p>
                        </div>
                    </div>

                    <Separator />

                    {/* Personal Info */}
                    <div className="space-y-3">
                        <InfoRow label="NID Number" value={recipient.nidNumber} />
                        <InfoRow label="Address" value={recipient.address} />
                    </div>

                    <Separator />

                    {/* Location Info */}
                    <div className="space-y-3">
                        <InfoRow label="Union" value={recipient.union?.name} />
                        <InfoRow label="Village" value={recipient.village?.name} />
                    </div>

                    <Separator />

                    {/* Donation Info */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                {donationPhoto ? (
                                    <AvatarImage src={donationPhoto} alt={donationTitle} />
                                ) : (
                                    <AvatarFallback>
                                        {donationTitle.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                )}
                            </Avatar>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Donation Section
                                </p>
                                <p className="font-medium">{donationTitle}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    {/* Meta */}
                    <div className="space-y-2 text-xs text-muted-foreground">
                        <InfoRow
                            label="Created At"
                            value={dayjs(recipient.createdAt).format(
                                "DD MMM YYYY, hh:mm A"
                            )}
                        />
                        <InfoRow
                            label="Updated At"
                            value={dayjs(recipient.updateAt).format(
                                "DD MMM YYYY, hh:mm A"
                            )}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end pt-2">
                        <Button variant="outline" onClick={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceRecipientViewDetailDialog;

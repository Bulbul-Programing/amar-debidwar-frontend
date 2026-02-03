"use client";

import InfoRow from "@/components/Shared/InoRow";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { TComplain } from "@/types/dashboard/MP/complain/complain";
import { FileText, MapPin, Clipboard, Camera } from "lucide-react";
import Image from "next/image";

interface IComplainViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    complain: TComplain | null;
}

const ComplainViewDetailDialog = ({
    open,
    onClose,
    complain,
}: IComplainViewDetailDialogProps) => {
    if (!complain) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Complaint Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Complaint Header */}
                    <div className="flex flex-col gap-4 p-6 bg-linear-to-br from-primary/30 to-emerald-200/30 rounded-lg mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-1">{complain.title}</h2>
                                <p className="text-muted-foreground">{complain.description}</p>
                            </div>

                            <Badge variant="secondary" className="text-lg px-4 py-2 w-fit">
                                Location: {complain.location}
                            </Badge>
                        </div>

                        {complain.category && (
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline">
                                    Category: {complain.category.name} ({complain.category.nameBn})
                                </Badge>
                            </div>
                        )}
                    </div>

                    {/* Complaint Information */}
                    <div className="space-y-6">
                        {/* General Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Clipboard className="h-5 w-5 text-blue-600" />
                                Complaint Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Title" value={complain.title} />
                                <InfoRow label="Description" value={complain.description} />
                                <InfoRow label="Location" value={complain.location} />
                                {complain.category && (
                                    <InfoRow
                                        label="Category"
                                        value={`${complain.category.name} (${complain.category.nameBn})`}
                                    />
                                )}
                            </div>
                        </div>

                        <Separator />

                        {/* Photo */}
                        {complain.photo && (
                            <div>
                                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                    <Camera className="h-5 w-5 text-green-600" />
                                    Photo
                                </h3>
                                <div className="bg-muted/50 p-4 rounded-lg flex justify-center">
                                    <Image
                                        src={complain.photo}
                                        alt={complain.title}
                                        width={400}
                                        height={300}
                                        className="rounded-md object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <Separator />

                        {/* Record Information */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                                Record Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Created At" value={formatDateTime(complain.createdAt)} />
                                <InfoRow label="Updated At" value={formatDateTime(complain.updateAt)} />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ComplainViewDetailDialog;

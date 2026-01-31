"use client";

import InfoRow from "@/components/Shared/InoRow";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { TUser } from "@/types/User/TUserInfo";
import { User, ShieldCheck } from "lucide-react";

interface IUserViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    user: TUser | null;
}

const UserViewDetailDialog = ({
    open,
    onClose,
    user,
}: IUserViewDetailDialogProps) => {
    if (!user) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* User Header */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 bg-linear-to-br from-primary/30 to-destructive/20 rounded-lg mb-6">
                        <div className="relative">
                            {user.profilePhoto ? (
                                <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                                    <AvatarImage src={user.profilePhoto} alt={user.name} />
                                </Avatar>
                            ) : (
                                <Badge
                                    className="h-24 w-24 rounded-full flex items-center justify-center text-3xl font-bold shadow-lg"
                                    variant="secondary"
                                >
                                    {user.name.charAt(0).toUpperCase()}
                                </Badge>
                            )}
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                            <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                <Badge
                                    variant={user.isActive ? "default" : "destructive"}
                                    className="text-sm text-white"
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </Badge>

                                <Badge variant="secondary" className="text-sm">
                                    {user.role}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* User Information */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Full Name" value={user.name} />
                                <InfoRow label="Email" value={user.email} />
                                <InfoRow label="Phone" value={user.phone || "Not provided"} />
                                <InfoRow label="User ID" value={user.id} />
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                Account Status
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Active Status"
                                    value={user.isActive ? "Active" : "Inactive"}
                                />
                                <InfoRow label="Role" value={user.role} />
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                            <InfoRow
                                label="Created At"
                                value={formatDateTime(user.createdAt)}
                            />
                            <InfoRow
                                label="Updated At"
                                value={formatDateTime(user.updateAt)}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default UserViewDetailDialog;

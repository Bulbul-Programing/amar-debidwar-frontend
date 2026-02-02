/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import InfoRow from "@/components/Shared/InoRow";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatters";
import { TProjectResponse } from "@/types/dashboard/MP/Projects/ProjectTypes";
import {
    Building2,
    Wallet,
    Landmark,
    FileText,
} from "lucide-react";

interface IProjectViewDetailDialogProps {
    open: boolean;
    onClose: () => void;
    project: TProjectResponse | null;
}

const ProjectViewDetailDialog = ({
    open,
    onClose,
    project,
}: IProjectViewDetailDialogProps) => {
    if (!project) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="min-w-4xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Project Details</DialogTitle>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {/* Project Header */}
                    <div className="flex flex-col gap-4 p-6 bg-linear-to-br from-primary/30 to-sky-200/30 rounded-lg mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="text-3xl font-bold mb-1">
                                    {project.title}
                                </h2>
                                <p className="text-muted-foreground">
                                    {project.description}
                                </p>
                            </div>

                            <Badge
                                variant="secondary"
                                className="text-lg px-4 py-2 w-fit"
                            >
                                ৳ {project.estimatedCost.toLocaleString()}
                            </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline">
                                Location: {project.location}
                            </Badge>
                            <Badge variant="outline">
                                Actual Cost:{" "}
                                {project.actualCost
                                    ? `৳ ${project.actualCost.toLocaleString()}`
                                    : "—"}
                            </Badge>
                        </div>
                    </div>

                    {/* Project Information */}
                    <div className="space-y-6">
                        {/* Project Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Building2 className="h-5 w-5 text-blue-600" />
                                Project Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow label="Project Title" value={project.title} />
                                <InfoRow label="Location" value={project.location} />
                                <InfoRow
                                    label="Estimated Cost"
                                    value={`৳ ${project.estimatedCost.toLocaleString()}`}
                                />
                                <InfoRow
                                    label="Actual Cost"
                                    value={
                                        project.actualCost
                                            ? `৳ ${project.actualCost.toLocaleString()}`
                                            : "—"
                                    }
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Budget Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Wallet className="h-5 w-5 text-emerald-600" />
                                Budget Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Budget Title"
                                    value={project.budget.title}
                                />
                                <InfoRow
                                    label="Fiscal Year"
                                    value={project.budget.fiscalYear}
                                />
                                <InfoRow
                                    label="Budget Amount"
                                    value={`৳ ${project.budget.budgetAmount.toLocaleString()}`}
                                />
                                <InfoRow
                                    label="Receive Date"
                                    value={formatDateTime(project.budget.receiveDate)}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Fund Source */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <Landmark className="h-5 w-5 text-green-600" />
                                Fund Source
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Fund Source Name"
                                    value={project.budget.fundSource.name}
                                />
                                <InfoRow
                                    label="Ministry"
                                    value={project.budget.fundSource.ministry}
                                />
                            </div>
                        </div>

                        <Separator />

                        {/* Meta Info */}
                        <div>
                            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                                <FileText className="h-5 w-5 text-purple-600" />
                                Record Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-lg">
                                <InfoRow
                                    label="Created At"
                                    value={formatDateTime(project.budget.createdAt)}
                                />
                                <InfoRow
                                    label="Updated At"
                                    value={formatDateTime(project.budget.updateAt)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectViewDetailDialog;

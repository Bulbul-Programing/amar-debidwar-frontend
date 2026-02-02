"use client"
import ManagementTable from "@/components/Shared/ManagementTable";
import { TBudgetResponse } from "@/types/dashboard/MP/budget/budgetTypes";
import { TProjectResponse } from "@/types/dashboard/MP/Projects/ProjectTypes";
import { ProjectColumns } from "./ProjectColumns";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ProjectFormDialog from "./ProjectFormDialog";
import ProjectViewDetailDialog from "./ProjectViewDetailDialog";
import DeleteConfirmationDialog from "@/components/Shared/DeleteConfirmationDialog";
import { deleteProject } from "@/service/Dashboard/MP/project/projectManagement";

interface AllProjectProps {
    projects: TProjectResponse[],
    budgets: TBudgetResponse[];
}

const AllProjectTable = ({ budgets, projects }: AllProjectProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingProject, setDeletingProject] = useState<TProjectResponse | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingProject, setViewingProject] = useState<TProjectResponse | null>(null);
    const [editProject, setEditProject] = useState<TProjectResponse | null>(null)

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (project: TProjectResponse) => {
        setViewingProject(project);
    };

    const handleEdit = (project: TProjectResponse) => {
        setEditProject(project)
    }

    const handleDelete = (project: TProjectResponse) => {
        setDeletingProject(project);
    };

    const confirmDelete = async () => {
        if (!deletingProject) return;

        setIsDeleting(true);
        const result = await deleteProject(deletingProject.id);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || "Project deleted successfully");
            setDeletingProject(null);
            handleRefresh();
        } else {
            toast.error(result.message || "Failed to delete project");
        }
    };

    return (
        <div>
            <ManagementTable
                data={projects}
                columns={ProjectColumns}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                getRowKey={(budget) => budget.id}
                emptyMessage="No Budget found"
            />

            <ProjectFormDialog
                open={!!editProject}
                onClose={() => setEditProject(null)}
                project={editProject!}
                budgets={budgets}
                onSuccess={() => {
                    setEditProject(null);
                    handleRefresh();
                }}
            />

            <ProjectViewDetailDialog
                open={!!viewingProject}
                onClose={() => setViewingProject(null)}
                project={viewingProject}
            />

            <DeleteConfirmationDialog
                open={!!deletingProject}
                onOpenChange={(open) =>
                    !open && setDeletingProject(null)
                }
                onConfirm={confirmDelete}
                title="Delete Budget"
                description={`Are you sure you want to delete ${deletingProject?.title}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />

        </div>
    );
};

export default AllProjectTable;
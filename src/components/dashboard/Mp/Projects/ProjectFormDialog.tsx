"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import InputFieldError from "@/components/Shared/InputFieldError";

import { TBudgetResponse } from "@/types/dashboard/MP/budget/budgetTypes";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { TProjectResponse } from "@/types/dashboard/MP/Projects/ProjectTypes";
import { createProject, updateProject } from "@/service/Dashboard/MP/project/projectManagement";

export interface IProjectFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    budgets: TBudgetResponse[];
    project?: TProjectResponse;
}

const ProjectFormDialog = ({
    open,
    onClose,
    onSuccess,
    budgets,
    project,
}: IProjectFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!project;

    const [selectedBudget, setSelectedBudget] = useState<TBudgetResponse | null>(
        project?.budget ?? null
    );
    const [openCombo, setOpenCombo] = useState(false);

    const [state, formAction, pending] = useActionState(
        isEdit ? updateProject.bind(null, project!.id) : createProject,
        null
    );
    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedBudget(project?.budget ?? null);
        onClose();
    };

    useEffect(() => {
        if (project) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedBudget(project?.budget ?? null);
        } else {
            setSelectedBudget(null);
        }
    }, [project]);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit
                    ? "Project updated successfully"
                    : "Project created successfully")
            );
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, isEdit]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit ? "Update Project" : "Create Project"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Title */}
                        <Field>
                            <FieldLabel htmlFor="title">Project Title</FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="New School Construction"
                                defaultValue={state?.formData?.title ?? project?.title ?? ""}
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Detailed description of the project"
                                defaultValue={state?.formData?.description ?? project?.description ?? ""}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Location */}
                        <Field>
                            <FieldLabel htmlFor="location">Location</FieldLabel>
                            <Input
                                id="location"
                                name="location"
                                placeholder="Dhaka, Bangladesh"
                                defaultValue={state?.formData?.location ?? project?.location ?? ""}
                            />
                            <InputFieldError field="location" state={state} />
                        </Field>

                        {/* Estimated Cost */}
                        <Field>
                            <FieldLabel htmlFor="estimatedCost">Estimated Cost</FieldLabel>
                            <Input
                                id="estimatedCost"
                                name="estimatedCost"
                                type="number"
                                step="any"
                                placeholder="1000000"
                                defaultValue={state?.formData?.estimatedCost ?? project?.estimatedCost ?? ""}
                            />
                            <InputFieldError field="estimatedCost" state={state} />
                        </Field>

                        {/* Budget Selection (Combobox) */}
                        <Field>
                            <FieldLabel>Budget</FieldLabel>

                            <input
                                type="hidden"
                                name="budgetId"
                                value={selectedBudget?.id ?? state?.formData?.budgetId ?? ""}
                            />

                            <Popover open={openCombo} onOpenChange={setOpenCombo}>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-between"
                                    >
                                        {selectedBudget?.title ?? "Select Budget"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search budget..." />
                                        <CommandEmpty>No budget found</CommandEmpty>
                                        <CommandGroup>
                                            {budgets.map((budgetItem) => (
                                                <CommandItem
                                                    key={budgetItem.id}
                                                    value={budgetItem.title}
                                                    onSelect={() => {
                                                        setSelectedBudget(budgetItem);
                                                        setOpenCombo(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedBudget?.id === budgetItem.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {budgetItem.title}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <InputFieldError field="budgetId" state={state} />
                        </Field>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={pending}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="text-white"
                            disabled={pending}
                        >
                            {pending
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Project"
                                    : "Create Project"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProjectFormDialog;

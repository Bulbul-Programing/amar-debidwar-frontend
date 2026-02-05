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
import { TExpenseCategory } from "@/types/dashboard/MP/expenseCategory/expenseCategory";
import { TExpense } from "@/types/dashboard/MP/expense/expense";
import { createExpense, updateExpense } from "@/service/Dashboard/MP/Expense/expense";

interface IExpenseFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    projects: TProjectResponse[];
    categories: TExpenseCategory[];
    expense?: TExpense;
}

/* ================= COMPONENT ================= */

const ExpenseFormDialog = ({
    open,
    onClose,
    onSuccess,
    projects,
    categories,
    expense,
}: IExpenseFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!expense;

    const [selectedProject, setSelectedProject] = useState<TProjectResponse | null>(expense?.project ?? null);
    const [selectedCategory, setSelectedCategory] = useState<TExpenseCategory | null>(expense?.expenseCategory ?? null);

    const [projectOpen, setProjectOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);

    const [state, formAction, pending] = useActionState(
        isEdit ? updateExpense.bind(null, expense!.id) : createExpense,
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedProject(expense?.project ?? null);
        setSelectedCategory(expense?.expenseCategory ?? null);
        onClose();
    };

    useEffect(() => {
        if (expense) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedProject(expense.project ?? null);
            setSelectedCategory(expense.expenseCategory ?? null);
        } else {
            setSelectedProject(null);
            setSelectedCategory(null);
        }
    }, [expense]);


    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit
                    ? "Expense updated successfully"
                    : "Expense created successfully")
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
                        {isEdit ? "Update Expense" : "Create Expense"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Description */}
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Input
                                name="description"
                                placeholder="Purchase of construction materials"
                                defaultValue={
                                    state?.formData?.description ??
                                    expense?.description ??
                                    ""
                                }
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Amount */}
                        <Field>
                            <FieldLabel>Amount</FieldLabel>
                            <Input
                                name="amount"
                                type="number"
                                step="any"
                                placeholder="50000"
                                defaultValue={
                                    state?.formData?.amount ??
                                    expense?.amount ??
                                    ""
                                }
                            />
                            <InputFieldError field="amount" state={state} />
                        </Field>

                        {/* Expense Date */}
                        <Field>
                            <FieldLabel>Expense Date</FieldLabel>
                            <Input
                                name="expenseDate"
                                type="date"
                                defaultValue={
                                    state?.formData?.expenseDate ??
                                    (expense?.expenseDate
                                        ? new Date(expense.expenseDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : "")
                                }
                            />
                            <InputFieldError field="expenseDate" state={state} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="Chalan Image">Chalan Image</FieldLabel>
                            <Input
                                id="Chalan Image"
                                name="chalanImage"
                                type="file"
                                accept="image/*"
                                placeholder="https://example.com/chalan.jpg"
                                defaultValue={
                                    state?.formData?.chalanImage ??
                                    expense?.chalanImage ??
                                    ""
                                }
                            />
                            <InputFieldError field="profilePhoto" state={state} />
                        </Field>

                        {/* Project Combobox */}
                        <Field>
                            <FieldLabel>Project</FieldLabel>

                            <input
                                type="hidden"
                                name="projectId"
                                value={selectedProject?.id ?? ""}
                            />

                            <Popover open={projectOpen} onOpenChange={setProjectOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-between"
                                    >
                                        {selectedProject
                                            ? selectedProject.title
                                            : "Select project"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search project..." />
                                        <CommandEmpty>No project found</CommandEmpty>
                                        <CommandGroup>
                                            {projects.map((project) => (
                                                <CommandItem
                                                    key={project.id}
                                                    onSelect={() => {
                                                        setSelectedProject(project);
                                                        setProjectOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedProject?.id === project.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {project.title}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <InputFieldError field="projectId" state={state} />
                        </Field>

                        {/* Category Combobox */}
                        <Field>
                            <FieldLabel>Expense Category</FieldLabel>

                            <input
                                type="hidden"
                                name="categoryId"
                                value={selectedCategory?.id ?? ""}
                            />

                            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-between"
                                    >
                                        {selectedCategory
                                            ? selectedCategory.name
                                            : "Select category"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search category..." />
                                        <CommandEmpty>No category found</CommandEmpty>
                                        <CommandGroup>
                                            {categories.map((category) => (
                                                <CommandItem
                                                    key={category.id}
                                                    onSelect={() => {
                                                        setSelectedCategory(category);
                                                        setCategoryOpen(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedCategory?.id === category.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {category.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <InputFieldError field="categoryId" state={state} />
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
                        <Button type="submit" disabled={pending}>
                            {pending
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Expense"
                                    : "Create Expense"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ExpenseFormDialog;

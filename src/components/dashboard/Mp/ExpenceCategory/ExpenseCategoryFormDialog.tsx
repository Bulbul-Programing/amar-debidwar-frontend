"use client";

import { useActionState, useEffect, useRef } from "react";
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
import { TExpenseCategory } from "@/types/dashboard/MP/expenceCategory/expenceCategory";
import { createExpenseCategory, updateExpenseCategory } from "@/service/Dashboard/MP/ExpenseCategory/expenseCategory";


export interface ExpenseFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category?: TExpenseCategory;
}

const ExpenseCategoryFormDialog = ({
    open,
    onClose,
    onSuccess,
    category,
}: ExpenseFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!category;

    const [state, formAction, pending] = useActionState(
        isEdit
            ? updateExpenseCategory.bind(null, category!.id)
            : createExpenseCategory,
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit
                    ? "Expense category updated successfully"
                    : "Expense category created successfully")
            );
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, isEdit, onClose, onSuccess]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit ? "Update Expense Category" : "Create Expense Category"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Category Name */}
                        <Field>
                            <FieldLabel htmlFor="name">
                                Category Name
                            </FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Office Supplies"
                                defaultValue={
                                    state?.formData?.name ??
                                    category?.name ??
                                    ""
                                }
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        {/* Category Name (Bangla) */}
                        <Field>
                            <FieldLabel htmlFor="nameBn">
                                Category Name (Bangla)
                            </FieldLabel>
                            <Input
                                id="nameBn"
                                name="nameBn"
                                placeholder="অফিস সামগ্রী"
                                defaultValue={
                                    state?.formData?.nameBn ??
                                    category?.nameBn ??
                                    ""
                                }
                            />
                            <InputFieldError field="nameBn" state={state} />
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
                                    ? "Update Category"
                                    : "Create Category"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ExpenseCategoryFormDialog;

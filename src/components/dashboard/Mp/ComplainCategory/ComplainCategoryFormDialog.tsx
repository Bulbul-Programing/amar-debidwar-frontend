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
import { TComplaintCategory } from "@/types/dashboard/MP/ComplainCategory/complainCategory";
import { createComplaintCategory, updateComplaintCategory } from "@/service/Dashboard/MP/ComplainCategory/complainCategory";

interface IComplainCategoryFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    category?: TComplaintCategory;
}

const ComplainCategoryFormDialog = ({
    open,
    onClose,
    onSuccess,
    category,
}: IComplainCategoryFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!category;

    const [isActive, setIsActive] = useState<boolean | null>(category?.isActive ?? true);
    const [openCombo, setOpenCombo] = useState(false);

    const [state, formAction, pending] = useActionState(
        isEdit
            ? updateComplaintCategory.bind(null, category!.id)
            : createComplaintCategory,
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setIsActive(category?.isActive ?? true);
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit
                    ? "Complaint category updated successfully"
                    : "Complaint category created successfully")
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
                        {isEdit ? "Update Complaint Category" : "Create Complaint Category"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Name */}
                        <Field>
                            <FieldLabel htmlFor="name">Name (English)</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Water Supply Issue"
                                defaultValue={state?.formData?.name ?? category?.name ?? ""}
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        {/* Name (Bangla) */}
                        <Field>
                            <FieldLabel htmlFor="nameBn">Name (Bangla)</FieldLabel>
                            <Input
                                id="nameBn"
                                name="nameBn"
                                placeholder="পানি সরবরাহ সমস্যা"
                                defaultValue={state?.formData?.nameBn ?? category?.nameBn ?? ""}
                            />
                            <InputFieldError field="nameBn" state={state} />
                        </Field>

                        {/* Hidden input for isActive */}
                        <input type="hidden" name="isActive" value={isActive ? "true" : "false"} />

                        {/* isActive Combobox */}
                        <Field>
                            <FieldLabel>Status</FieldLabel>
                            <Popover open={openCombo} onOpenChange={setOpenCombo}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {isActive ? "Active" : "Inactive"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Select status..." />
                                        <CommandEmpty>No options</CommandEmpty>
                                        <CommandGroup>
                                            {[true, false].map((status) => (
                                                <CommandItem
                                                    key={status ? "active" : "inactive"}
                                                    value={status ? "Active" : "Inactive"}
                                                    onSelect={() => {
                                                        setIsActive(status);
                                                        setOpenCombo(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            isActive === status
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {status ? "Active" : "Inactive"}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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
                        <Button type="submit" className="text-white" disabled={pending}>
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

export default ComplainCategoryFormDialog;

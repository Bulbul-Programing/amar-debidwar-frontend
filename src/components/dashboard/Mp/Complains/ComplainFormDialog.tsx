/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

import { TComplain } from "@/types/dashboard/MP/complain/complain";
import { TComplaintCategory } from "@/types/dashboard/MP/ComplainCategory/complainCategory";
import { createComplain, updateComplain } from "@/service/Dashboard/MP/Complain/complainManagement";

export interface IComplainFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    complain?: TComplain;
    complainCategory: TComplaintCategory[];
}

const ComplainFormDialog = ({
    open,
    onClose,
    onSuccess,
    complain,
    complainCategory: categories,
}: IComplainFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!complain;

    const [selectedCategory, setSelectedCategory] = useState<TComplaintCategory | null>(
        complain ? categories.find(c => c.id === complain.complainCategory) ?? null : null
    );

    const [categoryOpen, setCategoryOpen] = useState(false);

    const [state, formAction, pending] = useActionState(
        isEdit ? updateComplain.bind(null, complain!.id) : createComplain,
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedCategory(complain ? categories.find(c => c.id === complain.complainCategory) ?? null : null);
        setCategoryOpen(false);
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit ? "Complaint updated successfully" : "Complaint created successfully")
            );
            formRef.current?.reset();
            onSuccess();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, isEdit]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit ? "Update Complaint" : "Create Complaint"}
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
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                name="title"
                                placeholder="Enter complaint title"
                                defaultValue={state?.formData?.title ?? complain?.title ?? ""}
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                name="description"
                                placeholder="Enter complaint description"
                                defaultValue={state?.formData?.description ?? complain?.description ?? ""}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Location */}
                        <Field>
                            <FieldLabel>Location</FieldLabel>
                            <Input
                                name="location"
                                placeholder="Enter location"
                                defaultValue={state?.formData?.location ?? complain?.location ?? ""}
                            />
                            <InputFieldError field="location" state={state} />
                        </Field>

                        {/* Complaint Category */}
                        <Field>
                            <FieldLabel>Complaint Category</FieldLabel>

                            {/* hidden input to send category ID */}
                            <input
                                type="hidden"
                                name="complainCategory"
                                value={selectedCategory?.id ?? ""}
                            />

                            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedCategory ? selectedCategory.name : "Select category"}
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
                                                            selectedCategory?.id === category.id ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {category.name} <span className={`${category?.nameBn ? "block" : "hidden"}`}>({category?.nameBn ? category.nameBn : ""})</span>
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputFieldError field="complainCategory" state={state} />
                        </Field>

                        {/* Photo URL */}
                        <Field>
                            <FieldLabel htmlFor="photo">Photo</FieldLabel>
                            <Input
                                id="photo"
                                name="photo"
                                type="file"
                                accept="image/*"
                            />
                            <InputFieldError field="photo" state={state} />
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
                                    ? "Update Complaint"
                                    : "Create Complaint"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ComplainFormDialog;

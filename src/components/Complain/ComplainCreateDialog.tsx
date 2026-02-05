"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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
const ComplainCreateDialog = ({
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

    const [state, formAction, pending] = useActionState(createComplain,
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedCategory(
            complain ? categories.find(c => c.id === complain.complainCategory) ?? null : null
        );
        setCategoryOpen(false);
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit ? "অভিযোগ সফলভাবে হালনাগাদ হয়েছে" : "অভিযোগ সফলভাবে জমা দেওয়া হয়েছে")
            );
            formRef.current?.reset();
            onSuccess();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onSuccess, isEdit]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit ? "অভিযোগ হালনাগাদ করুন" : "নতুন অভিযোগ জমা দিন"}
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
                            <FieldLabel>অভিযোগের শিরোনাম</FieldLabel>
                            <Input
                                name="title"
                                placeholder="সংক্ষেপে অভিযোগের শিরোনাম লিখুন"
                                defaultValue={state?.formData?.title ?? complain?.title ?? ""}
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel>অভিযোগের বিবরণ</FieldLabel>
                            <Textarea
                                name="description"
                                placeholder="বিস্তারিতভাবে আপনার অভিযোগ লিখুন"
                                defaultValue={state?.formData?.description ?? complain?.description ?? ""}
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Location */}
                        <Field>
                            <FieldLabel>অবস্থান</FieldLabel>
                            <Input
                                name="location"
                                placeholder="ঘটনাস্থল বা এলাকার নাম লিখুন"
                                defaultValue={state?.formData?.location ?? complain?.location ?? ""}
                            />
                            <InputFieldError field="location" state={state} />
                        </Field>

                        {/* Complaint Category */}
                        <Field>
                            <FieldLabel>অভিযোগের ধরন</FieldLabel>

                            <input
                                type="hidden"
                                name="complainCategory"
                                value={selectedCategory?.id ?? ""}
                            />

                            <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedCategory
                                            ? selectedCategory.name
                                            : "অভিযোগের ধরন নির্বাচন করুন"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="ধরন খুঁজুন..." />
                                        <CommandEmpty>কোনো ধরন পাওয়া যায়নি</CommandEmpty>
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
                                                    {category.nameBn && (
                                                        <span className="ml-1 text-muted-foreground">
                                                            ({category.nameBn})
                                                        </span>
                                                    )}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <InputFieldError field="complainCategory" state={state} />
                        </Field>

                        {/* Photo */}
                        <Field>
                            <FieldLabel>ছবি সংযুক্ত করুন</FieldLabel>
                            <Input
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
                            বাতিল
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending
                                ? isEdit
                                    ? "হালনাগাদ হচ্ছে..."
                                    : "জমা দেওয়া হচ্ছে..."
                                : isEdit
                                    ? "অভিযোগ হালনাগাদ করুন"
                                    : "অভিযোগ জমা দিন"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ComplainCreateDialog;
/* eslint-disable @typescript-eslint/no-explicit-any */
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
import InputFieldError from "@/components/Shared/InputFieldError";
import { toast } from "sonner";
import { createDonationSection, updateDonationSection } from "@/service/Dashboard/MP/DonationSection/donationSection";
import { TDonationSection } from "@/types/dashboard/MP/DonationSection/donationSection";
import Image from "next/image";

interface IDonationSectionFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    donationSection?: TDonationSection;
}

const DonationSectionFormDialog = ({
    open,
    onClose,
    onSuccess,
    donationSection,
}: IDonationSectionFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!donationSection;

    const [state, formAction, pending] = useActionState(
        isEdit
            ? updateDonationSection.bind(null, donationSection!.id)
            : createDonationSection,
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
                    ? "Donation section updated successfully"
                    : "Donation section created successfully")
            );
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess, isEdit]);

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) handleClose();
            }}
        >
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>
                        {isEdit
                            ? "Update Donation Section"
                            : "Create Donation Section"}
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
                                placeholder="Donate for flood relief"
                                defaultValue={
                                    state?.formData?.title ??
                                    donationSection?.title ??
                                    ""
                                }
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Photo */}
                        <Field>
                            <FieldLabel>Donation Photo</FieldLabel>
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
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Section"
                                    : "Create Section"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DonationSectionFormDialog;

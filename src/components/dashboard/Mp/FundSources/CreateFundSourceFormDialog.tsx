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
import { createFundSource } from "@/service/Dashboard/MP/FundSource/fundManagement";

interface ICreateFundSourceFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateFundSourceFormDialog = ({
    open,
    onClose,
    onSuccess,
}: ICreateFundSourceFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, pending] = useActionState(createFundSource, null);
    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "Fund source created successfully");
            formRef.current?.reset();
            onSuccess();
            onClose();
        } else if (state && !state.success && state.message) {
            toast.error(state.message);
        }
    }, [state, onClose, onSuccess]);

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="px-6 pt-6 pb-4">
                    <DialogTitle>Create Fund Source</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Fund Source Name */}
                        <Field>
                            <FieldLabel htmlFor="name">
                                Fund Source Name
                            </FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Government Development Fund"
                                defaultValue={state?.formData?.name ?? ""}
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        {/* Ministry */}
                        <Field>
                            <FieldLabel htmlFor="ministry">
                                Ministry
                            </FieldLabel>
                            <Input
                                id="ministry"
                                name="ministry"
                                placeholder="Ministry of Finance"
                                defaultValue={state?.formData?.ministry ?? ""}
                            />
                            <InputFieldError field="ministry" state={state} />
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
                            {pending ? "Creating..." : "Create Fund Source"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateFundSourceFormDialog;

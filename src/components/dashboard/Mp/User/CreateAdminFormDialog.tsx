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
import { createAdminUser } from "@/service/Dashboard/MP/userManagement";

interface ICreateUserFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const CreateUserFormDialog = ({
    open,
    onClose,
    onSuccess,
}: ICreateUserFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, pending] = useActionState(createAdminUser, null);
    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(state.message || "User created successfully");
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
                    <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>

                <form
                    ref={formRef}
                    action={formAction}
                    className="flex flex-col flex-1 min-h-0"
                >
                    <div className="flex-1 overflow-y-auto px-6 space-y-4 pb-4">
                        {/* Name */}
                        <Field>
                            <FieldLabel htmlFor="name">Full Name</FieldLabel>
                            <Input
                                id="name"
                                name="name"
                                placeholder="MD John Doe"
                                defaultValue={state?.formData?.name ?? ""}
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        {/* Email */}
                        <Field>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                defaultValue={state?.formData?.email ?? ""}
                            />
                            <InputFieldError field="email" state={state} />
                        </Field>

                        {/* Phone */}
                        <Field>
                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="01XXXXXXXXX"
                                defaultValue={state?.formData?.phone ?? ""}
                            />
                            <InputFieldError field="phone" state={state} />
                        </Field>

                        {/* Password */}
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="******"
                            />
                            <InputFieldError field="password" state={state} />
                        </Field>

                        {/* Profile Photo */}
                        <Field>
                            <FieldLabel htmlFor="profilePhoto">Profile Photo</FieldLabel>
                            <Input
                                id="profilePhoto"
                                name="profilePhoto"
                                type="file"
                                accept="image/*"
                            />
                            <InputFieldError field="profilePhoto" state={state} />
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
                            {pending ? "Creating..." : "Create User"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateUserFormDialog;

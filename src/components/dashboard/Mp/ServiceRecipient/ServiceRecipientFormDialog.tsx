/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useActionState, useEffect, useRef, useState, useMemo } from "react";
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

import {
    createServiceRecipient,
    updateServiceRecipient,
} from "@/service/Dashboard/MP/ServiceRecipient/ServiceRecipientManagement";

import {
    TServiceRecipient,
    TUnion,
    TVillage,
} from "@/types/dashboard/MP/serviceRecipient/serviceRecipient";
import { TDonationSection } from "@/types/dashboard/MP/DonationSection/donationSection";

export interface IServiceRecipientFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    unions: TUnion[];
    villages: TVillage[];
    donations: TDonationSection[];
    recipient?: TServiceRecipient;
}

const ServiceRecipientFormDialog = ({
    open,
    onClose,
    onSuccess,
    unions,
    villages,
    donations,
    recipient,
}: IServiceRecipientFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!recipient;

    const [selectedUnion, setSelectedUnion] = useState<TUnion | null>(
        recipient?.union ?? null
    );
    const [selectedVillage, setSelectedVillage] = useState<TVillage | null>(
        recipient?.village ?? null
    );
    const [selectedDonation, setSelectedDonation] =
        useState<TDonationSection | null>(recipient?.donation ?? null);

    const [openUnion, setOpenUnion] = useState(false);
    const [openVillage, setOpenVillage] = useState(false);
    const [openDonation, setOpenDonation] = useState(false);

    const [state, formAction, pending] = useActionState(
        isEdit
            ? updateServiceRecipient.bind(null, recipient!.id)
            : createServiceRecipient,
        null
    );

    /** ✅ Filter villages by selected union */
    const filteredVillages = useMemo(() => {
        if (!selectedUnion) return [];
        return villages.filter((v) => v.unionId === selectedUnion.id);
    }, [selectedUnion, villages]);

    const prevStateRef = useRef(state);

    const handleClose = () => {
        setSelectedUnion(recipient?.union ?? null);
        setSelectedVillage(recipient?.village ?? null);
        setSelectedDonation(recipient?.donation ?? null);
        onClose();
    };

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit
                    ? "Service recipient updated successfully"
                    : "Service recipient created successfully")
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
                        {isEdit ? "Update Service Recipient" : "Create Service Recipient"}
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
                            <FieldLabel>Name</FieldLabel>
                            <Input
                                name="name"
                                defaultValue={state?.formData?.name ?? recipient?.name ?? ""}
                                placeholder="John deo"
                            />
                            <InputFieldError field="name" state={state} />
                        </Field>

                        {/* Phone */}
                        <Field>
                            <FieldLabel>Phone</FieldLabel>
                            <Input
                                name="phone"
                                defaultValue={state?.formData?.phone ?? recipient?.phone ?? ""}
                                placeholder="1234567890"
                            />
                            <InputFieldError field="phone" state={state} />
                        </Field>

                        {/* Address */}
                        <Field>
                            <FieldLabel>Address</FieldLabel>
                            <Input
                                name="address"
                                defaultValue={state?.formData?.address ?? recipient?.address ?? ""}
                                placeholder="Maji Bari"
                            />
                            <InputFieldError field="address" state={state} />
                        </Field>

                        {/* Nid*/}
                        <Field>
                            <FieldLabel>Nid</FieldLabel>
                            <Input
                                name="nidNumber"
                                placeholder="1234567890***"
                                defaultValue={state?.formData?.nidNumber ?? recipient?.nidNumber ?? ""}
                            />
                            <InputFieldError field="phone" state={state} />
                        </Field>

                        {/* Hidden Inputs */}
                        <input type="hidden" name="unionId" value={selectedUnion?.id ?? ""} />
                        <input
                            type="hidden"
                            name="villageId"
                            value={selectedVillage?.id ?? ""}
                        />
                        <input
                            type="hidden"
                            name="donationId"
                            value={selectedDonation?.id ?? ""}
                        />

                        {/* Union */}
                        <Field>
                            <FieldLabel>Union</FieldLabel>
                            <Popover open={openUnion} onOpenChange={setOpenUnion}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedUnion?.name ?? "Select Union"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search union..." />
                                        <CommandEmpty>No union found</CommandEmpty>
                                        <CommandGroup>
                                            {unions.map((u) => (
                                                <CommandItem
                                                    key={u.id}
                                                    value={u.name}
                                                    onSelect={() => {
                                                        setSelectedUnion(u);
                                                        setSelectedVillage(null); // ✅ reset village
                                                        setOpenUnion(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedUnion?.id === u.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {u.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputFieldError field="unionId" state={state} />
                        </Field>

                        {/* Village */}
                        <Field>
                            <FieldLabel>Village</FieldLabel>
                            <Popover open={openVillage} onOpenChange={setOpenVillage}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full justify-between"
                                        disabled={!selectedUnion}
                                    >
                                        {selectedVillage?.name ?? "Select Village"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search village..." />
                                        <CommandEmpty>
                                            {selectedUnion
                                                ? "No village found"
                                                : "Please select a union first"}
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {filteredVillages.map((v) => (
                                                <CommandItem
                                                    key={v.id}
                                                    value={v.name}
                                                    onSelect={() => {
                                                        setSelectedVillage(v);
                                                        setOpenVillage(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedVillage?.id === v.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {v.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputFieldError field="villageId" state={state} />
                        </Field>

                        {/* Donation */}
                        <Field>
                            <FieldLabel>Donation Section</FieldLabel>
                            <Popover open={openDonation} onOpenChange={setOpenDonation}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedDonation?.title ?? "Select Donation"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search donation..." />
                                        <CommandGroup>
                                            {donations.map((d) => (
                                                <CommandItem
                                                    key={d.id}
                                                    value={d.title}
                                                    onSelect={() => {
                                                        setSelectedDonation(d);
                                                        setOpenDonation(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedDonation?.id === d.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {d.title}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <InputFieldError field="donationId" state={state} />
                        </Field>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-2 px-6 py-4 border-t">
                        <Button type="button" variant="outline" onClick={handleClose} disabled={pending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={pending}>
                            {pending
                                ? isEdit
                                    ? "Updating..."
                                    : "Creating..."
                                : isEdit
                                    ? "Update Recipient"
                                    : "Create Recipient"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ServiceRecipientFormDialog;

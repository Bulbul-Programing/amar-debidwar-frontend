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
    createBudget,
    updateBudget,
} from "@/service/Dashboard/MP/budget/budgetManagement";
import { TFundSource } from "@/types/dashboard/MP/Fund/FundTypes";

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
import { TBudgetResponse } from "@/types/dashboard/MP/budget/budgetTypes";

interface IBudgetFormDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    fundSources: TFundSource[];
    budget?: TBudgetResponse;
}

const BudgetFormDialog = ({
    open,
    onClose,
    onSuccess,
    fundSources,
    budget,
}: IBudgetFormDialogProps) => {
    const formRef = useRef<HTMLFormElement>(null);
    const isEdit = !!budget;

    const [selectedFundSource, setSelectedFundSource] =
        useState<TFundSource | null>(budget?.fundSource ?? null);

    const [openCombo, setOpenCombo] = useState(false);

    const [state, formAction, pending] = useActionState(
        isEdit ? updateBudget.bind(null, budget!.id) : createBudget,
        null
    );

    const prevStateRef = useRef(state);

    const handleClose = () => {
        formRef.current?.reset();
        setSelectedFundSource(budget?.fundSource ?? null);
        onClose();
    };

    useEffect(() => {
        if (budget) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedFundSource(budget.fundSource ?? null);
        } else {
            setSelectedFundSource(null);
        }
    }, [budget]);

    useEffect(() => {
        if (state === prevStateRef.current) return;
        prevStateRef.current = state;

        if (state?.success) {
            toast.success(
                state.message ||
                (isEdit
                    ? "Budget updated successfully"
                    : "Budget created successfully")
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
                        {isEdit ? "Update Budget" : "Create Budget"}
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
                            <FieldLabel htmlFor="title">
                                Budget Title
                            </FieldLabel>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Infrastructure Development Budget"
                                defaultValue={
                                    state?.formData?.title ??
                                    budget?.title ??
                                    ""
                                }
                            />
                            <InputFieldError field="title" state={state} />
                        </Field>

                        {/* Description */}
                        <Field>
                            <FieldLabel htmlFor="description">
                                Description
                            </FieldLabel>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Detailed description of the budget allocation"
                                defaultValue={
                                    state?.formData?.description ??
                                    budget?.description ??
                                    ""
                                }
                            />
                            <InputFieldError field="description" state={state} />
                        </Field>

                        {/* Budget Amount */}
                        <Field>
                            <FieldLabel htmlFor="budgetAmount">
                                Budget Amount
                            </FieldLabel>
                            <Input
                                id="budgetAmount"
                                name="budgetAmount"
                                type="number"
                                step="any"
                                placeholder="1000000"
                                defaultValue={
                                    state?.formData?.budgetAmount ??
                                    budget?.budgetAmount ??
                                    ""
                                }
                            />
                            <InputFieldError
                                field="budgetAmount"
                                state={state}
                            />
                        </Field>

                        {/* Fiscal Year */}
                        <Field>
                            <FieldLabel htmlFor="fiscalYear">
                                Fiscal Year
                            </FieldLabel>
                            <Input
                                id="fiscalYear"
                                name="fiscalYear"
                                placeholder="2025-2026"
                                defaultValue={
                                    state?.formData?.fiscalYear ??
                                    budget?.fiscalYear ??
                                    ""
                                }
                            />
                            <InputFieldError field="fiscalYear" state={state} />
                        </Field>

                        {/* Receive Date */}
                        <Field>
                            <FieldLabel htmlFor="receiveDate">
                                Receive Date
                            </FieldLabel>
                            <Input
                                id="receiveDate"
                                name="receiveDate"
                                type="date"
                                defaultValue={
                                    state?.formData?.receiveDate ??
                                    (budget?.receiveDate
                                        ? new Date(budget.receiveDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : "")
                                }
                            />
                            <InputFieldError
                                field="receiveDate"
                                state={state}
                            />
                        </Field>

                        {/* Fund Source (Combobox) */}
                        <Field>
                            <FieldLabel>Fund Source</FieldLabel>

                            {/* hidden input for server action */}
                            <input
                                type="hidden"
                                name="fundSourceId"
                                value={
                                    selectedFundSource?.id ??
                                    state?.formData?.fundSourceId ??
                                    ""
                                }
                            />

                            <Popover
                                open={openCombo}
                                onOpenChange={setOpenCombo}
                            >
                                <PopoverTrigger asChild>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full justify-between"
                                    >
                                        {selectedFundSource
                                            ? selectedFundSource.name
                                            : "Select fund source"}
                                        <ChevronsUpDown className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-0">
                                    <Command>
                                        <CommandInput placeholder="Search fund source..." />
                                        <CommandEmpty>
                                            No fund source found
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {fundSources.map((source) => (
                                                <CommandItem
                                                    key={source.id}
                                                    value={source.name}
                                                    onSelect={() => {
                                                        setSelectedFundSource(
                                                            source
                                                        );
                                                        setOpenCombo(false);
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            selectedFundSource?.id ===
                                                                source.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {source.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <InputFieldError
                                field="fundSourceId"
                                state={state}
                            />
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
                                    ? "Update Budget"
                                    : "Create Budget"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BudgetFormDialog;

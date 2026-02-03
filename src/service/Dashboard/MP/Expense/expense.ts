/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { hostImages } from "@/utils/ImageUpload";
import { createExpenseSchema } from "@/zod/Dashboard/MP/expenseValidation";
import { revalidateTag } from "next/cache";

/* ---------------- CREATE EXPENSE ---------------- */
export const createExpense = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payload: {
        description: FormDataEntryValue | null;
        amount: number;
        expenseDate: FormDataEntryValue | null;
        categoryId: FormDataEntryValue | null;
        projectId: FormDataEntryValue | null;
        chalanImage?: string;
    } = {
        description: formData.get("description"),
        amount: Number(formData.get("amount")),
        expenseDate: formData.get("expenseDate"),
        categoryId: formData.get("categoryId"),
        projectId: formData.get("projectId"),
        chalanImage: ''
    };

    if (formData.get("chalanImage") as File) {
        const uploadPhoto = await hostImages([formData.get("chalanImage") as File,]);
        payload.chalanImage = uploadPhoto[0]
    }
    else {
        delete payload.chalanImage
    }

    console.log(payload);

    const validateResult = zodValidator(
        payload,
        createExpenseSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payload,
        };
    }

    const res = await serverFetch.post("/expense", {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("expenses", { expire: 0 });
    }

    return result;
};

/* ---------------- GET ALL EXPENSES ---------------- */
export const getAllExpenses = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/expense${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "expenses",
                        `expense-${page}`,
                        `expense-${searchTerm}`,
                    ],
                    revalidate: 180,
                },
            }
        );

        return await response.json();
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
        };
    }
};

/* ---------------- UPDATE EXPENSE ---------------- */
export const updateExpense = async (
    expenseId: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payload: {
        description: FormDataEntryValue | null;
        amount: number;
        expenseDate: FormDataEntryValue | null;
        categoryId: FormDataEntryValue | null;
        projectId: FormDataEntryValue | null;
        chalanImage?: string;
    } = {
        description: formData.get("description"),
        amount: Number(formData.get("amount")),
        expenseDate: formData.get("expenseDate"),
        categoryId: formData.get("categoryId"),
        projectId: formData.get("projectId"),
        chalanImage: ''
    };

    const validateResult = zodValidator(
        payload,
        createExpenseSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payload,
        };
    }

    if (formData.get("chalanImage") as File) {
        const uploadPhoto = await hostImages([formData.get("chalanImage") as File,]);
        payload.chalanImage = uploadPhoto[0]
    }
    else {
        delete payload.chalanImage
    }

    const res = await serverFetch.patch(`/expense/${expenseId}`, {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("expenses", { expire: 0 });
    }

    return result;
};

/* ---------------- DELETE EXPENSE ---------------- */
export const deleteExpense = async (expenseId: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(`/expense/${expenseId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("expenses", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }

        console.error(error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete expense. Please try again.",
        };
    }
};

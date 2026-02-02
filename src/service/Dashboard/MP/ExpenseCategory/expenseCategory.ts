/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createExpenseCategorySchema } from "@/zod/Dashboard/MP/expenseValidation";
import { revalidateTag } from "next/cache";

export const createExpenseCategory = async (_currentState: any, formData: FormData): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        nameBn: formData.get("nameBn") || null,
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createExpenseCategorySchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.post("/expenseCategory", {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("expense-categories", { expire: 0 });
    }

    return result;
};

export const getAllExpenseCategories = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/expenseCategory${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "expense-categories",
                        `expense-category-${page}`,
                        `expense-category-${searchTerm}`,
                    ],
                    revalidate: 180,
                },
            }
        );

        const result = await response.json();
        return result;
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

export const updateExpenseCategory = async (categoryId: string, _currentState: any, formData: FormData): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        nameBn: formData.get("nameBn") || null,
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createExpenseCategorySchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.patch(`/expenseCategory/${categoryId}`,
        {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidateTag("expense-categories", { expire: 0 });
    }

    return result;
};

export const deleteExpenseCategory = async (categoryId: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(
            `/expenseCategory/${categoryId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await res.json();
        
        if (result.success) {
            revalidateTag("expense-categories", { expire: 0 });
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
                    : "Failed to delete expense category. Please try again.",
        };
    }
};

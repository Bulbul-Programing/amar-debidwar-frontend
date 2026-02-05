/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createBudgetSchema } from "@/zod/Dashboard/MP/budgetValidation";
import { revalidateTag } from "next/cache";


export const getAllBudgets = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/budget${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "budgets",
                        `budget-${page}`,
                        `budget-${searchTerm}`,
                    ],
                    revalidate: 180,
                },
            }
        )

        const result = await response.json()
        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export const getAllBudgetsByFundSource = async (fundSourceId: string) => {
    try {
        const response = await serverFetch.get(`/budget/fundSource/${fundSourceId}`,
            {
                next: {
                    tags: [
                        "budgets"
                    ],
                    revalidate: 180,
                },
            }
        )

        const result = await response.json()
        return result
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

export const createBudget = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const payloadForValidate = {
            title: formData.get("title"),
            description: formData.get("description"),
            budgetAmount: Number(formData.get("budgetAmount")),
            fiscalYear: formData.get("fiscalYear"),
            receiveDate: formData.get("receiveDate"),
            fundSourceId: formData.get("fundSourceId"),
        };

        const validateResult = zodValidator(
            payloadForValidate,
            createBudgetSchema
        );

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payloadForValidate,
            };
        }

        const res = await serverFetch.post("/budget", {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("budgets", { expire: 0 });
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
                    : "Failed to create budget. Please try again.",
        };
    }
};

export const deleteBudget = async (budgetId: string) => {
    try {
        const res = await serverFetch.delete(`/budget/${budgetId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag('budgets', { expire: 0 })
        }
        return result;

    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete budget. Please try again.",
        };
    }
}

export const updateBudget = async (budgetId: string, _prevState: any, formData: FormData) => {
    try {
        const payloadForValidate = {
            title: formData.get("title"),
            description: formData.get("description"),
            budgetAmount: Number(formData.get("budgetAmount")),
            fiscalYear: formData.get("fiscalYear"),
            receiveDate: formData.get("receiveDate"),
            fundSourceId: formData.get("fundSourceId"),
        };

        const validateResult = zodValidator(
            payloadForValidate,
            createBudgetSchema
        );

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payloadForValidate,
            };
        }
        const res = await serverFetch.patch(`/budget/${budgetId}`, {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("budgets", { expire: 0 });
        }

        return result;

    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
        };
    }
};

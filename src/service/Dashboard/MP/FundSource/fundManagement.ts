"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { fundSourceCreateValidation } from "@/zod/Dashboard/MP/fundValidation";
import { revalidateTag } from "next/cache";

/* eslint-disable @typescript-eslint/no-explicit-any */


export const createFundSource = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payloadForValidate = {
            name: formData.get("name"),
            ministry: formData.get("ministry")
        };

        const validateResult = zodValidator(payloadForValidate, fundSourceCreateValidation);

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payloadForValidate, // 🔥 THIS IS THE KEY
            }
        }

        const res = await serverFetch.post("/fundSource", {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag("fundSources", { expire: 0 });
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
                    : "Failed to create fund source. Please try again.",
        };
    }
};

export const getAllFoundSource = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/fundSource${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "fundSources",
                        `fundSource-${page}`,
                        `fundSource-${searchTerm}`,
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
};

export const deleteFundSource = async (fundSourceId: string): Promise<any> => {
    try {

        const res = await serverFetch.delete(`/fundSource/${fundSourceId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag("fundSources", { expire: 0 });
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
                    : "Failed to delete fund source. Please try again.",
        };
    }
};
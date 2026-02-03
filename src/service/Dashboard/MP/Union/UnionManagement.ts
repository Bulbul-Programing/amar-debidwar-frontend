/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createUnionSchema } from "@/zod/Dashboard/MP/UnionAndVillage";
import { revalidateTag } from "next/cache";


export const createUnion = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        population: formData.get("population")
            ? Number(formData.get("population"))
            : null,
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createUnionSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.post("/union", {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("unions", { expire: 0 });
    }

    return result;
};

export const getAllUnion = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/union${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "unions",
                        `union-${page}`,
                        `union-${searchTerm}`,
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

export const updateUnion = async (
    unionId: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        population: formData.get("population")
            ? Number(formData.get("population"))
            : null,
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createUnionSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.patch(`/union/${unionId}`, {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("unions", { expire: 0 });
    }

    return result;
};

export const deleteUnion = async (unionId: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(`/union/${unionId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("unions", { expire: 0 });
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
                    : "Failed to delete union. Please try again.",
        };
    }
};

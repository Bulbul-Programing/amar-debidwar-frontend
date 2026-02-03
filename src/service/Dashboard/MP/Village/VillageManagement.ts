/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createVillageSchema } from "@/zod/Dashboard/MP/UnionAndVillage";
import { revalidateTag } from "next/cache";

export const createVillage = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        population: formData.get("population")
            ? Number(formData.get("population"))
            : null,
        unionId: formData.get("unionId"),
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createVillageSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.post("/village", {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("villages", { expire: 0 });
    }

    return result;
};

export const getAllVillage = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/village${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "villages",
                        `village-${page}`,
                        `village-${searchTerm}`,
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

export const updateVillage = async (
    villageId: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        population: formData.get("population")
            ? Number(formData.get("population"))
            : null,
        unionId: formData.get("unionId"),
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createVillageSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.patch(`/village/${villageId}`, {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("villages", { expire: 0 });
    }

    return result;
};

export const deleteVillage = async (villageId: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(`/village/${villageId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("villages", { expire: 0 });
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
                    : "Failed to delete village. Please try again.",
        };
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { hostImages } from "@/utils/ImageUpload";
import { createComplainSchema } from "@/zod/Dashboard/MP/complainValidation";
import { revalidateTag } from "next/cache";

/**
 * Create a new complaint
 */
export const createComplain = async (_currentState: any, formData: FormData): Promise<any> => {
    const payloadForValidate: {
        title: FormDataEntryValue | null;
        description: FormDataEntryValue | null;
        location: FormDataEntryValue | null;
        complainCategory: FormDataEntryValue | null;
        photo?: string;
    } = {
        title: formData.get("title"),
        description: formData.get("description"),
        photo: "",
        location: formData.get("location"),
        complainCategory: formData.get("complainCategory"),
    };

    const validateResult = zodValidator(payloadForValidate, createComplainSchema);

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    if (formData.get("photo") as File) {
        const uploadPhoto = await hostImages([formData.get("photo") as File,]);
        payloadForValidate.photo = uploadPhoto[0]
    }
    else {
        delete payloadForValidate.photo
    }

    const res = await serverFetch.post("/complain", {
        body: JSON.stringify(validateResult.data),
        headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("complains", { expire: 0 });
    }

    return result;
};

/**
 * Get all complaints with optional query string
 */
export const getAllComplains = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const res = await serverFetch.get(`/complain${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: ["complains", `complain-${page}`, `complain-${searchTerm}`],
                revalidate: 180,
            },
        });

        return await res.json();
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to fetch complaints. Please try again.",
        };
    }
};

/**
 * Update complaint by ID
 */
export const updateComplain = async (
    complainId: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        title: formData.get("title"),
        description: formData.get("description"),
        photo: formData.get("photo"),
        location: formData.get("location"),
        complainCategory: formData.get("complainCategory"),
    };

    const validateResult = zodValidator(payloadForValidate, createComplainSchema);

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.patch(`/complain/${complainId}`, {
        body: JSON.stringify(validateResult.data),
        headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("complains", { expire: 0 });
    }

    return result;
};

/**
 * Delete complaint by ID
 */
export const deleteComplain = async (complainId: string): Promise<any> => {
    try {
        const res = await serverFetch.delete(`/complain/${complainId}`, {
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("complains", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;

        console.error(error);

        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to delete complaint. Please try again.",
        };
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createComplaintCategorySchema } from "@/zod/Dashboard/MP/complainValidation";
import { revalidateTag } from "next/cache";

export const getAllComplaintCategories = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/complainCategory${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: ["complaint-categories", `complaint-category-${page}`, `complaint-category-${searchTerm}`],
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
            message: process.env.NODE_ENV === "development" ? error.message : "Something went wrong",
        };
    }
};

export const createComplaintCategory = async (_prevState: any, formData: FormData) => {
    try {
        const payloadForValidate = {
            name: formData.get("name"),
            nameBn: formData.get("nameBn"),
            isActive: formData.get("isActive") === "true" ? true : false,
        };

        const validateResult = zodValidator(payloadForValidate, createComplaintCategorySchema);

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payloadForValidate,
            };
        }

        const res = await serverFetch.post("/complainCategory", {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("complaint-categories", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to create category. Please try again.",
        };
    }
};

export const updateComplaintCategory = async (categoryId: string, _prevState: any, formData: FormData) => {
    try {
        const payloadForValidate = {
            name: formData.get("name"),
            nameBn: formData.get("nameBn"),
            isActive: formData.get("isActive") === "true" ? true : false,
        };

        const validateResult = zodValidator(payloadForValidate, createComplaintCategorySchema);

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payloadForValidate,
            };
        }

        const res = await serverFetch.patch(`/complainCategory/${categoryId}`, {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("complaint-categories", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to update category. Please try again.",
        };
    }
};

export const deleteComplaintCategory = async (categoryId: string) => {
    try {
        const res = await serverFetch.delete(`/complainCategory/${categoryId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("complaint-categories", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message: process.env.NODE_ENV === "development" ? error.message : "Failed to delete category. Please try again.",
        };
    }
};

/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createServiceRecipientSchema } from "@/zod/Dashboard/MP/serviceRecipientValidationSchema";
import { revalidateTag } from "next/cache";

export const createServiceRecipient = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        nidNumber: formData.get("nidNumber"),
        address: formData.get("address"),
        unionId: formData.get("unionId"),
        villageId: formData.get("villageId"),
        donationId: formData.get("donationId"),
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createServiceRecipientSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.post("/serviceRecipient", {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("service-recipients", { expire: 0 });
    }

    return result;
};

export const getAllServiceRecipients = async (
    queryString?: string
): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/serviceRecipient${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "service-recipients",
                        `service-recipient-${page}`,
                        `service-recipient-${searchTerm}`,
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

export const updateServiceRecipient = async (
    recipientId: string,
    _currentState: any,
    formData: FormData
): Promise<any> => {
    const payloadForValidate = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        nidNumber: formData.get("nidNumber"),
        address: formData.get("address"),
        unionId: formData.get("unionId"),
        villageId: formData.get("villageId"),
        donationId: formData.get("donationId"),
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createServiceRecipientSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.patch(
        `/serviceRecipient/${recipientId}`,
        {
            body: JSON.stringify(validateResult.data),
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const result = await res.json();

    if (result.success) {
        revalidateTag("service-recipients", { expire: 0 });
    }

    return result;
};

export const deleteServiceRecipient = async (
    recipientId: string
): Promise<any> => {
    try {
        const res = await serverFetch.delete(
            `/serviceRecipient/${recipientId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidateTag("service-recipients", { expire: 0 });
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
                    : "Failed to delete service recipient. Please try again.",
        };
    }
};

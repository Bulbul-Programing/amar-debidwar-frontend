/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { hostImages } from "@/utils/ImageUpload";
import { donationSectionCreateValidation, donationSectionUpdateValidation } from "@/zod/Dashboard/MP/donationValidation";
import { revalidateTag } from "next/cache";

export const getAllDonationSections = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(
            `/donationSection${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "donation-sections",
                        `donation-section-${page}`,
                        `donation-section-${searchTerm}`,
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

export const createDonationSection = async (
    _currentState: any,
    formData: FormData
): Promise<any> => {
    try {
        const payload: {
            title: FormDataEntryValue | null,
            photo?: FormDataEntryValue | null
        } = {
            title: formData.get("title"),
            photo: formData.get("photo"),
        };

        const validateResult = zodValidator(
            payload,
            donationSectionCreateValidation
        );

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payload,
            };
        }
        if (formData.get("photo") as File) {
            const uploadPhoto = await hostImages([formData.get("photo") as File,]);
            payload.photo = uploadPhoto[0]
        }


        const res = await serverFetch.post("/donationSection", {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag("donation-sections", { expire: 0 });
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
                    : "Failed to create donation section. Please try again.",
        };
    }
};

export const updateDonationSection = async (
    sectionId: string,
    _prevState: any,
    formData: FormData
): Promise<any> => {
    try {
        const payload: {
            title: FormDataEntryValue | null,
            photo?: FormDataEntryValue | null
        } = {
            title: formData.get("title"),
            photo: formData.get("photo"),
        };

        const validateResult = zodValidator(
            payload,
            donationSectionUpdateValidation
        );

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payload,
            };
        }

        if ((formData.get("photo") as File).size > 0) {
            const uploadPhoto = await hostImages([formData.get("photo") as File,]);
            payload.photo = uploadPhoto[0]
        }
        else {
            delete payload.photo
        }

        const res = await serverFetch.patch(
            `/donationSection/${sectionId}`,
            {
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const result = await res.json();

        if (result.success) {
            revalidateTag("donation-sections", { expire: 0 });
        }

        return result;
    } catch (error: any) {
        console.error(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Failed to update donation section. Please try again.",
        };
    }
};

export const deleteDonationSection = async (sectionId: string) => {
    try {
        const res = await serverFetch.delete(
            `/donationSection/${sectionId}`
        );

        const result = await res.json();

        if (result.success) {
            revalidateTag("donation-sections", { expire: 0 });
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
                    : "Failed to delete donation section. Please try again.",
        };
    }
};

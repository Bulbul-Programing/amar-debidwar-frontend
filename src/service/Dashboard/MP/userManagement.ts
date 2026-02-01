/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { TUser } from "@/types/User/TUserInfo";
import { hostImages } from "@/utils/ImageUpload";
import { createAdminUserSchema } from "@/zod/auth.validation";
import { revalidateTag } from "next/cache";

export const createAdminUser = async (_currentState: any, formData: FormData): Promise<any> => {
    try {
        const payloadForValidate = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            phone: formData.get("phone"),
            profilePhoto: formData.get("profilePhoto") as File
        };

        const validateResult = zodValidator(payloadForValidate, createAdminUserSchema);

        if (!validateResult.success) {
            return {
                ...validateResult,
                formData: payloadForValidate, // 🔥 THIS IS THE KEY
            }
        }

        const payload = {
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            password: formData.get("password"),
            profilePhoto: ''
        };

        if (formData.get("profilePhoto") as File) {
            const uploadPhoto = await hostImages([formData.get("profilePhoto") as File,]);
            payload.profilePhoto = uploadPhoto[0]
        }

        const res = await serverFetch.post("/user/createAdmin", {
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag("users", { expire: 0 });
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
                    : "Failed to create user. Please try again.",
        };
    }
};

export const getAllUsers = async (queryString?: string) => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/user${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "users",
                        `users-${page}`,
                        `users-${searchTerm}`,
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

export const blockedUser = async (userInfo: TUser) => {
    try {
        const res = await serverFetch.patch(`/user/block/${userInfo.id}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag('users', { expire: 0 })
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    : "Failed to update user status. Please try again.",
        };
    }
}

export const deleteUser = async (userId: string) => {
    try {
        const res = await serverFetch.delete(`/user/${userId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        if (result.success) {
            revalidateTag('users', { expire: 0 })
        }
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                    : "Failed to delete user. Please try again.",
        };
    }
}
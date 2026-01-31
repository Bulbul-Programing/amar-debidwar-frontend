/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

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

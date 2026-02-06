/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";

export const getMPDashboardHomeData = async (): Promise<any> => {
    try {
        const response = await serverFetch.get(`/dashboard/mp`, {
            next: {
                tags: [
                    "complains",
                    `budgets`,
                    `complains`,
                    "complaint-categories",
                    "donation-sections",
                    "expenses",
                    "expense-categories",
                    "fundSources",
                    "projects",
                    
                ],
                revalidate: 180,
            },
        });

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
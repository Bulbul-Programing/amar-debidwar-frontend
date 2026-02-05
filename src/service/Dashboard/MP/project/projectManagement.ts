/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createProjectSchema } from "@/zod/Dashboard/MP/porjectValidation";
import { revalidateTag } from "next/cache";

export const createProject = async (_currentState: any, formData: FormData): Promise<any> => {
    const payloadForValidate = {
        title: formData.get("title"),
        description: formData.get("description"),
        location: formData.get("location"),
        estimatedCost: Number(formData.get("estimatedCost")),
        budgetId: formData.get("budgetId"),
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createProjectSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.post("/project", {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("projects", { expire: 0 });
    }

    return result;


}

export const getSingleProject = async (projectId: string): Promise<any> => {
    try {

        const res = await serverFetch.get(`/project/${projectId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

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
                    : "Failed to retrieve project. Please try again.",
        };
    }
};

export const getAllProject = async (queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/project${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "projects",
                        `project-${page}`,
                        `project-${searchTerm}`,
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

export const getAllProjectByBudgetId = async (budgetId: string, queryString?: string): Promise<any> => {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";

        const response = await serverFetch.get(`/project/budget/${budgetId}${queryString ? `?${queryString}` : ""}`,
            {
                next: {
                    tags: [
                        "projects",
                        `project-${page}`,
                        `project-${searchTerm}`,
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

export const updateProject = async (projectId: string, _currentState: any, formData: FormData): Promise<any> => {
    const payloadForValidate = {
        title: formData.get("title"),
        description: formData.get("description"),
        location: formData.get("location"),
        estimatedCost: Number(formData.get("estimatedCost")),
        budgetId: formData.get("budgetId"),
    };

    const validateResult = zodValidator(
        payloadForValidate,
        createProjectSchema
    );

    if (!validateResult.success) {
        return {
            ...validateResult,
            formData: payloadForValidate,
        };
    }

    const res = await serverFetch.patch(`/project/${projectId}`, {
        body: JSON.stringify(validateResult.data),
        headers: {
            "Content-Type": "application/json",
        },
    });

    const result = await res.json();

    if (result.success) {
        revalidateTag("projects", { expire: 0 });
    }

    return result;


}

export const deleteProject = async (projectId: string): Promise<any> => {
    try {

        const res = await serverFetch.delete(`/project/${projectId}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();
        if (result.success) {
            revalidateTag("projects", { expire: 0 });
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
                    : "Failed to delete project. Please try again.",
        };
    }
};
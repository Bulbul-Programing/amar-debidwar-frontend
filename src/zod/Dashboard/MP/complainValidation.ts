import { z } from 'zod';
export const createComplainSchema = z.object({
    title: z.string({
        error: "Title is required",
    }),
    description: z.string({
        error: "Description is required",
    }),
    photo: z.string().optional(),
    location: z.string({
        error: "Location is required",
    }),
    complainCategory: z.string({
        error: "Complaint category is required",
    }),
})

export const createComplaintCategorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Complaint category name must be at least 2 characters long")
        .max(100, "Complaint category name cannot exceed 100 characters"),

    nameBn: z
        .string()
        .trim()
        .min(2, "Complaint category name (Bangla) must be at least 2 characters long")
        .max(100, "Complaint category name (Bangla) cannot exceed 100 characters")
        .optional()
        .nullable(),

    isActive: z
        .boolean()
        .optional(),
});
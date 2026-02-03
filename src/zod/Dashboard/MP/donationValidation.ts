import { z } from 'zod';

export const donationSectionCreateValidation = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters"),

    photo: z
        .instanceof(File, { message: "Profile photo is required" })
        .refine((file) => file.size > 0, "Profile photo cannot be empty")
        .refine(
            (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
            "Photo must be JPEG, PNG, or WEBP"
        ),
});

export const donationSectionUpdateValidation = z.object({
    title: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters long")
        .max(100, "Name cannot exceed 100 characters")
        .optional(),

    photo: z
        .instanceof(File, { message: "Profile photo is required" })
        .optional()
    ,
});
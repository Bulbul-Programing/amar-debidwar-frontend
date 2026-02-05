import { z } from 'zod';
export const createComplainSchema = z.object({
    title: z.string({
        error: "শিরোনাম প্রয়োজন",
    })
        .min(4, "শিরোনামের ন্যূনতম দৈর্ঘ্য ৪ অক্ষর হতে হবে"),

    description: z.string({
        error: "বিবরণ প্রয়োজন",
    })
        .min(10, "বিবরণের ন্যূনতম দৈর্ঘ্য ১০ অক্ষর হতে হবে"),

    photo: z.url().optional(),

    location: z.string({
        error: "অবস্থান প্রয়োজন",
    })
        .min(4, "অবস্থানের ন্যূনতম দৈর্ঘ্য ৪ অক্ষর হতে হবে"),

    complainCategory: z.string({
        error: "শিকায়ত বিভাগের নাম প্রয়োজন",
    })
        .min(5, "শিকায়ত বিভাগের নামের ন্যূনতম দৈর্ঘ্য ৫ অক্ষর হতে হবে"),
});

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